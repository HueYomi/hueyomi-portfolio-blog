#!/opt/homebrew/bin/bash

# Script to create GitHub issues from markdown files
# Usage: ./create-github-issues.sh

# set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration file
CONFIG_FILE="github-config.json"

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
    echo -e "${RED}Error: Configuration file '$CONFIG_FILE' not found!${NC}"
    echo "Please create the configuration file with your GitHub settings."
    exit 1
fi

# Check if jq is installed
JQ_CMD="jq"
if ! command -v jq &> /dev/null; then
    # Try local jq in scripts directory
    if [ -f "./jq" ]; then
        JQ_CMD="./jq"
        echo -e "${YELLOW}Using local jq binary: ./jq${NC}"
    else
        echo -e "${RED}Error: jq is required but not installed.${NC}"
        echo "Please install jq: brew install jq (on macOS) or apt-get install jq (on Ubuntu)"
        echo "Or download jq binary to scripts directory"
        exit 1
    fi
fi

# Read configuration
GITHUB_OWNER=$($JQ_CMD -r '.github.owner' "$CONFIG_FILE")
GITHUB_REPO=$($JQ_CMD -r '.github.repo' "$CONFIG_FILE")
GITHUB_TOKEN=$($JQ_CMD -r '.github.token' "$CONFIG_FILE")
API_URL=$($JQ_CMD -r '.github.api_url' "$CONFIG_FILE")
ASSIGNEE=$($JQ_CMD -r '.issue_settings.assignee' "$CONFIG_FILE")
ISSUES_DIR=$($JQ_CMD -r '.directories.issues_dir' "$CONFIG_FILE")

# Validate configuration
if [ "$GITHUB_OWNER" = "your-github-username" ] || [ "$GITHUB_TOKEN" = "your-github-token" ]; then
    echo -e "${RED}Error: Please update the configuration file with your actual GitHub credentials!${NC}"
    exit 1
fi

# Check if issues directory exists
if [ ! -d "$ISSUES_DIR" ]; then
    echo -e "${RED}Error: Issues directory '$ISSUES_DIR' not found!${NC}"
    exit 1
fi

echo -e "${BLUE}🚀 Starting GitHub Issues Creation${NC}"
echo -e "${BLUE}Repository: $GITHUB_OWNER/$GITHUB_REPO${NC}"
echo -e "${BLUE}Issues Directory: $ISSUES_DIR${NC}"
echo ""

# Function to get existing labels from repository
get_existing_labels() {
    local response=$(curl -s -w "%{http_code}" \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "$API_URL/repos/$GITHUB_OWNER/$GITHUB_REPO/labels")
    
    local http_code="${response: -3}"
    local response_body="${response%???}"
    
    if [ "$http_code" = "200" ]; then
        echo "$response_body" | $JQ_CMD -r '.[].name'
    else
        echo ""
    fi
}

# Function to create a label on GitHub
create_label() {
    local name="$1"
    local color="$2"
    local description="$3"
    
    echo -e "${PURPLE}Creating label: $name${NC}"
    
    local json_payload=$($JQ_CMD -n \
        --arg name "$name" \
        --arg color "$color" \
        --arg description "$description" \
        '{
            name: $name,
            color: $color,
            description: $description
        }')
    
    local response=$(curl -s -w "%{http_code}" \
        -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -H "Content-Type: application/json" \
        -d "$json_payload" \
        "$API_URL/repos/$GITHUB_OWNER/$GITHUB_REPO/labels")
    
    local http_code="${response: -3}"
    local response_body="${response%???}"
    
    if [ "$http_code" = "201" ]; then
        echo -e "${GREEN}✅ Label '$name' created successfully${NC}"
        return 0
    elif [ "$http_code" = "422" ]; then
        echo -e "${YELLOW}⚠️  Label '$name' already exists${NC}"
        return 2  # Return 2 for already exists
    else
        echo -e "${RED}❌ Failed to create label '$name'${NC}"
        echo -e "${RED}   HTTP Code: $http_code${NC}"
        echo -e "${RED}   Response: $response_body${NC}"
        return 1
    fi
}

# Function to setup default labels
setup_labels() {
    echo -e "${BLUE}🏷️  Setting up GitHub labels...${NC}"
    
    # Get existing labels
    local existing_labels=$(get_existing_labels)
    
    # Define labels to create
    declare -A labels=(
        # Priority labels
        ["priority: high"]="d73027:High priority issues that must be completed first"
        ["priority: medium"]="fee08b:Medium priority issues"
        ["priority: low"]="74c476:Low priority issues"
        
        # Phase labels
        ["Phase 1"]="1f77b4:Data Structure & JSON Setup"
        ["Phase 2"]="ff7f0e:Component Refactoring"
        ["Phase 3"]="2ca02c:Configuration & Build Setup"
        ["Phase 4"]="d62728:AWS Infrastructure Setup"
        ["Phase 5"]="9467bd:Performance & SEO Optimization"
        ["Phase 6"]="8c564b:Content Management & Documentation"
        ["Phase 7"]="e377c2:Testing & Quality Assurance"
        ["Phase 8"]="7f7f7f:Deployment & Launch"
        
        # Category labels
        ["data-structure"]="0052cc:Data and JSON structure related"
        ["components"]="5319e7:React components and UI"
        ["configuration"]="c2e0c6:Configuration and setup"
        ["aws"]="ff9500:AWS infrastructure and deployment"
        ["testing"]="fbca04:Testing and quality assurance"
        ["seo"]="0e8a16:SEO and optimization"
        ["documentation"]="1d76db:Documentation and guides"
        ["nextjs"]="000000:Next.js framework related"
        ["typescript"]="3178c6:TypeScript related"
        ["optimization"]="28a745:Performance optimization"
        ["deployment"]="6f42c1:Deployment and CI/CD"
        
        # Default labels
        ["enhancement"]="a2eeef:New feature or request"
        ["roadmap"]="0075ca:Part of project roadmap"
    )
    
    local created_count=0
    local skipped_count=0
    
    for label in "${!labels[@]}"; do
        IFS=':' read -r color description <<< "${labels[$label]}"
        
        # Check if label already exists
        if echo "$existing_labels" | grep -q "^$label$"; then
            echo -e "${YELLOW}⚠️  Label '$label' already exists, skipping${NC}"
            ((skipped_count++))
        else
            create_label "$label" "$color" "$description"
            local result=$?
            
            if [ $result -eq 0 ]; then
                ((created_count++))
            elif [ $result -eq 2 ]; then
                ((skipped_count++))
            fi
            # Small delay to avoid rate limiting
            sleep 0.5
        fi
    done
    
    echo -e "${BLUE}📊 Labels Summary:${NC}"
    echo -e "${GREEN}✅ Created: $created_count labels${NC}"
    echo -e "${YELLOW}⚠️  Skipped: $skipped_count labels (already exist)${NC}"
    echo ""
}

# Function to extract title from markdown file
extract_title() {
    local file="$1"
    grep -m 1 "^# " "$file" | sed 's/^# //'
}

# Function to extract labels from markdown file
extract_labels() {
    local file="$1"
    local labels=""
    
    # Extract labels from the Labels section
    if grep -q "## Labels" "$file"; then
        labels=$(sed -n '/## Labels/,/^$/p' "$file" | grep "^- \`" | sed 's/^- `//;s/`.*$//' | sed 's/[[:space:]]*$//' | tr '\n' ',' | sed 's/,$//')
    fi
    
    # Add default labels
    local default_labels=$($JQ_CMD -r '.issue_settings.default_labels | join(",")' "$CONFIG_FILE")
    if [ -n "$labels" ] && [ -n "$default_labels" ]; then
        labels="$labels,$default_labels"
    elif [ -n "$default_labels" ]; then
        labels="$default_labels"
    fi
    
    # Remove duplicates
    if [ -n "$labels" ]; then
        labels=$(echo "$labels" | tr ',' '\n' | sort -u | tr '\n' ',' | sed 's/,$//')
    fi
    
    echo "$labels"
}

# Function to create GitHub issue
create_issue() {
    local file="$1"
    local title="$2"
    local body="$3"
    local labels="$4"
    
    echo -e "${YELLOW}Creating issue: $title${NC}"
    
    # Prepare JSON payload
    local json_payload=$($JQ_CMD -n \
        --arg title "$title" \
        --arg body "$body" \
        --arg assignee "$ASSIGNEE" \
        --argjson labels "$(echo "$labels" | $JQ_CMD -R 'split(",") | map(select(length > 0))')" \
        '{
            title: $title,
            body: $body,
            assignees: [$assignee],
            labels: $labels
        }')
    
    # Create the issue
    local response=$(curl -s -w "%{http_code}" \
        -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -H "Content-Type: application/json" \
        -d "$json_payload" \
        "$API_URL/repos/$GITHUB_OWNER/$GITHUB_REPO/issues")
    
    local http_code="${response: -3}"
    local response_body="${response%???}"
    
    if [ "$http_code" = "201" ]; then
        local issue_number=$(echo "$response_body" | $JQ_CMD -r '.number')
        local issue_url=$(echo "$response_body" | $JQ_CMD -r '.html_url')
        echo -e "${GREEN}✅ Issue #$issue_number created successfully${NC}"
        echo -e "${GREEN}   URL: $issue_url${NC}"
        echo -e "${BLUE}   Labels: $labels${NC}"
        return 0
    else
        echo -e "${RED}❌ Failed to create issue: $title${NC}"
        echo -e "${RED}   HTTP Code: $http_code${NC}"
        echo -e "${RED}   Response: $response_body${NC}"
        # Don't exit the script, just return failure status
        return 1
    fi
}

# Function to create missing Next.js init issue if not exists
create_nextjs_init_issue() {
    echo -e "${BLUE}🔍 Checking for Next.js initialization issue...${NC}"
    
    local init_issue_file="$ISSUES_DIR/issue-00-init-nextjs-source.md"
    
    if [ ! -f "$init_issue_file" ]; then
        echo -e "${YELLOW}📝 Creating missing Next.js initialization issue...${NC}"
        
        cat > "$init_issue_file" << 'EOF'
# Issue #0: Initialize Next.js Source Code

**Priority: High | Estimated: 2-3 hours**

## Description
Initialize the Next.js project structure and set up the basic foundation for the portfolio blog application.

## Tasks
- [ ] Initialize Next.js project with TypeScript
- [ ] Set up project directory structure
- [ ] Install required dependencies (Chakra UI, React Icons, Framer Motion, etc.)
- [ ] Configure initial TypeScript configuration
- [ ] Set up basic layout components
- [ ] Create initial pages structure
- [ ] Configure ESLint and Prettier
- [ ] Set up basic routing structure
- [ ] Create initial components directory
- [ ] Set up styles and theme configuration

## Files to Create
- `package.json` with all required dependencies
- `tsconfig.json` for TypeScript configuration
- `next.config.js` for Next.js configuration
- `pages/_app.tsx` - App wrapper
- `pages/_document.tsx` - Document configuration
- `pages/index.tsx` - Homepage
- `components/Layout.tsx` - Main layout
- `styles/` directory for styling
- `public/` directory for static assets
- `types/` directory for TypeScript types

## Dependencies to Install
```json
{
  "dependencies": {
    "next": "15.2.4",
    "@chakra-ui/react": "2.8.2",
    "@chakra-ui/icons": "2.1.1",
    "@emotion/react": "^11",
    "@emotion/styled": "^11",
    "framer-motion": "11.0.5",
    "react": "^18",
    "react-dom": "^18",
    "react-icons": "5.0.1",
    "axios": "1.6.7"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "15.2.4"
  }
}
```

## Acceptance Criteria
- [ ] Next.js project initialized successfully
- [ ] TypeScript configuration working
- [ ] All required dependencies installed
- [ ] Basic project structure created
- [ ] Development server runs without errors
- [ ] Basic layout and routing working
- [ ] Code quality tools (ESLint) configured
- [ ] Project ready for feature development

## Labels
- `Phase 0`
- `priority: high`
- `nextjs`
- `setup`
- `initialization`
EOF
        
        echo -e "${GREEN}✅ Created Next.js initialization issue${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠️  Next.js initialization issue already exists${NC}"
        return 1
    fi
}

# Main execution
echo -e "${BLUE}🔧 Step 1: Setting up GitHub labels...${NC}"
setup_labels

echo -e "${BLUE}🔧 Step 2: Checking for required issues...${NC}"
create_nextjs_init_issue

echo -e "${BLUE}🔧 Step 3: Creating GitHub issues...${NC}"
success_count=0
error_count=0

# Process each markdown file in the issues directory (sorted)
for file in $(ls "$ISSUES_DIR"/*.md | sort -V); do
    if [ -f "$file" ]; then
        echo -e "${BLUE}Processing: $(basename "$file")${NC}"
        
        # Extract issue details
        title=$(extract_title "$file")
        labels=$(extract_labels "$file")
        body=$(cat "$file")
        
        if [ -z "$title" ]; then
            echo -e "${RED}❌ Could not extract title from $file${NC}"
            ((error_count++))
            continue
        fi
        
        # Create the issue
        create_issue "$file" "$title" "$body" "$labels"
        create_result=$?
        
        if [ $create_result -eq 0 ]; then
            ((success_count++))
        else
            ((error_count++))
        fi
        
        echo ""
        
        # Add a small delay to avoid rate limiting
        sleep 1
    fi
done

# Summary
echo -e "${BLUE}📊 Final Summary:${NC}"
echo -e "${GREEN}✅ Successfully created: $success_count issues${NC}"
if [ $error_count -gt 0 ]; then
    echo -e "${RED}❌ Failed to create: $error_count issues${NC}"
fi

if [ $success_count -gt 0 ]; then
    echo -e "${GREEN}🎉 GitHub issues have been created successfully!${NC}"
    echo -e "${BLUE}Visit your repository to view the issues: https://github.com/$GITHUB_OWNER/$GITHUB_REPO/issues${NC}"
fi 