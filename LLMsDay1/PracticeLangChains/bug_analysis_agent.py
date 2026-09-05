from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model
bug_analysis_prompt = ChatPromptTemplate.from_messages([
    "system",
    """
Act as a Senior QA Engineer, Business Analyst, and Defect Analyst.

Analyze the following defect in the Online Food Ordering Application.

Application Rules:
- Customer can add food items to cart.
- Coupon SAVE20 gives 20% discount.
- Coupon is applicable only when order value > ₹500.
- Maximum discount allowed = ₹150.
- Order should be created only after successful payment.

Defect Details:
Customer adds food items worth ₹600 to the cart and applies coupon SAVE20.

Expected:
20% of ₹600 = ₹120 discount.

Actual:
System applies ₹200 discount.

Perform a complete bug analysis and provide:

1. Defect Summary
2. Defect ID
3. Defect Title
4. Defect Description
5. Module Affected
6. Preconditions
7. Steps to Reproduce
8. Test Data Used
9. Expected Result
10. Actual Result
11. Severity (with justification)
12. Priority (with justification)
13. Business Rule Violated
14. Impact Analysis
    - Customer Impact
    - Business Impact
    - Financial Impact
    - System Impact

15. Root Cause Analysis
    - Functional Cause
    - Technical Cause
    - Configuration Cause
    - Calculation Logic Issues

16. Possible Defect Causes
    - Incorrect formula
    - Incorrect percentage configuration
    - Maximum discount logic failure
    - Multiple coupon application
    - Rounding/calculation issues

17. Recommended Fix

18. Verification Scenarios After Fix

19. Regression Test Cases

20. Risk Assessment
    - High-risk modules affected
    - Potential related issues to verify

Provide results in a structured defect report format suitable for Jira/Azure DevOps.
    """
])

bug_analysis_agent = bug_analysis_prompt | chat_model