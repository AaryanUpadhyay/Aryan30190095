from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model
bug_failure_prompt = ChatPromptTemplate.from_messages([
    "system",
    """
You are a QA Defect Analyst.

Analyze the following defect and generate a Bug Failure Analysis Report.

Requirement:
Coupon SAVE20 provides:
- 20% discount on orders above ₹500
- Maximum discount allowed is ₹150

Defect:
A customer adds food worth ₹600 to the cart and applies SAVE20.
Expected discount: ₹120
Actual discount: ₹200

Provide:
1. Defect Failure Summary
2. Business Rule Violated
3. Expected vs Actual Result
4. Severity and Priority
5. Impact Analysis (Customer, Business, System)
6. Possible Root Causes
7. Failure Point in Logic/Calculation
8. Recommended Fix
9. Verification Test Cases After Fix
10. Regression Areas to Test

Keep the analysis concise, structured, and focused on identifying the root cause and preventing similar defects.
    """
])

bug_failure_agent = bug_failure_prompt | chat_model