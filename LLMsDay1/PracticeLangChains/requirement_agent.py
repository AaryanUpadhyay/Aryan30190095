from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model


requirement_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
Act as a Business Analyst, QA Engineer, and Defect Analyst.

Analyze the following requirement:

An authenticated customer can search restaurants, add/remove food items from a cart, apply coupon SAVE20, select a delivery address, choose a payment method (UPI, Credit Card, Debit Card, COD), and place an order.

Coupon Rules:
- SAVE20 gives 20% discount.
- Applicable only when order value > ₹500.
- Maximum discount = ₹150.

Order Rules:
- Customer must be logged in.
- Cart must not be empty.
- Delivery address is mandatory.
- Order is created only after successful payment.
- If payment fails, no order should be created.
- Successful orders generate a unique Order ID and order confirmation.

Generate:
1. Functional requirements
2. Business rules
3. Assumptions, ambiguities, and missing requirements
4. Validations and edge cases
5. Positive, negative, and boundary test scenarios
6. Detailed test cases for:
   - Cart management
   - SAVE20 coupon
   - Payment processing
   - Order placement
7. Boundary Value Analysis for ₹500 coupon eligibility
8. Payment success/failure test cases
9. Requirement Traceability Matrix (RTM)
10. Defect Analysis for:

Defect:
Cart value = ₹600.
Coupon SAVE20 applied.
Expected discount = ₹120.
Actual discount = ₹200.

Provide:
- Defect report
- Severity & priority
- Root cause analysis
- Impact analysis
- Fix recommendation
- Regression test cases

Present output in structured sections and tables.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}
"""
    )
])

requirement_agent = requirement_prompt | chat_model