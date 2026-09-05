from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model

test_case_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
Act as a Senior QA Engineer and Test Architect.

Based on the following requirement, generate comprehensive test scenarios and test cases.

Application: Online Food Ordering System

Requirement:
- Customer logs in.
- Searches restaurants.
- Adds/removes food items from cart.
- Applies coupon SAVE20.
- Selects delivery address.
- Chooses payment method (UPI, Credit Card, Debit Card, COD).
- Places an order.

Coupon Rules:
- SAVE20 provides 20% discount.
- Applicable only when order value > ₹500.
- Maximum discount = ₹150.

Order Rules:
- User must be logged in.
- Cart must not be empty.
- Delivery address is mandatory.
- Order is created only after successful payment.
- If payment fails, order must not be created.
- Successful order generates unique Order ID and confirmation.

Generate:

1. Test Scenarios
2. Positive Test Cases
3. Negative Test Cases
4. Boundary Value Test Cases
5. Edge Case Test Cases

Cover the following modules:
- Login
- Restaurant Search
- Cart Management
- Coupon Application
- Address Selection
- Payment Processing
- Order Placement
- Order Confirmation

For each test case provide:
- Test Case ID
- Module
- Test Scenario
- Preconditions
- Test Steps
- Test Data
- Expected Result
- Priority (High/Medium/Low)

Special Coverage:
- Add/Remove items from cart
- Coupon SAVE20 validation
- Boundary values: ₹499, ₹500, ₹500.01, ₹501, ₹750, ₹1000
- Maximum discount cap validation
- Payment success/failure scenarios
- Payment timeout and cancellation
- Duplicate payment attempts
- Successful and failed order creation
- Order ID generation validation

Present results in a structured table format.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Requirement Analysis:

{analysis}
"""
    )
])


# Create the LangChain runnable
test_case = test_case_prompt | chat_model