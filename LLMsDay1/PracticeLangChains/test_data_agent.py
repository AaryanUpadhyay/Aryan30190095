from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model


test_data_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
Generate test data and validation scenarios for the following defect.

Include:
- Positive test data
- Negative test data
- Boundary value test data
- Edge case test data
- Invalid input test data
- Regression test data

For each scenario provide:
- Scenario
- Input/Test Data
- Expected Result


Follow the business rules and focus only on test data generation and validation coverage.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Test Cases:

{test_cases}
"""
    )
])


test_data_agent = test_data_prompt | chat_model