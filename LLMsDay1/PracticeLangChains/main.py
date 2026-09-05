from PracticeLangChains import bug_analysis_agent, bug_failure_agent
import test_case_agent
from requirement_agent import requirement_agent
from test_case_agent import test_case_chain
from test_data_agent import test_data_agent
from test_review_agent import test_review_agent


requirement = """
A customer should be able to log in to a food delivery application, search for a restaurant, add food items to the cart, apply a coupon, select a delivery address, make payment, and place the order.

The application supports UPI, credit/debit cards, and Cash on Delivery. A coupon SAVE20 gives 20% off on orders above ₹500, with a maximum discount of ₹150.

If payment fails, the order should not be created. If payment succeeds, the customer should receive an order confirmation with an order ID.
"""


# ==========================================
# AGENT 1 - REQUIREMENT ANALYSIS
# ==========================================

print("\n" + "=" * 70)
print("AGENT 1 - REQUIREMENT ANALYSIS")
print("=" * 70)

analysis_response = requirement_agent.invoke({
    "requirement": requirement
})

analysis = analysis_response.content

print(analysis)


# ==========================================
# AGENT 2 - TEST CASE GENERATION
# ==========================================

print("\n" + "=" * 70)
print("AGENT 2 - TEST CASE GENERATION")
print("=" * 70)

test_case_response = test_case.invoke({
    "requirement": requirement,
    "analysis": analysis
})

test_cases = test_case_response.content

print(test_cases)

print("\nFULL RESPONSE:")
print(test_case_response)

print("\nCONTENT:")
print(test_case_response.content)


# ==========================================
# AGENT 3 - TEST DATA GENERATION
# ==========================================

print("\n" + "=" * 70)
print("AGENT 3 - TEST DATA GENERATION")
print("=" * 70)

test_data_response = test_data_agent.invoke({
    "requirement": requirement,
    "test_cases": test_cases
})

test_data = test_data_response.content

print(test_data)

print("\nFULL RESPONSE:")
print(test_data_response)

print("\nCONTENT:")
print(test_data_response.content)


# ==========================================
# AGENT 4 - TEST BUG/FAILURE ANALYSIS
# ==========================================

print("\n" + "=" * 70)
print("AGENT 4 - TEST BUG/FAILURE ANALYSIS")
print("=" * 70)

bug_response = bug_failure_agent.invoke({
    "requirement": requirement,
    "analysis": analysis,
    "test_cases": test_cases,
    "test_data": test_data
})

bug_response = bug_response.content

print(bug_response)

print("\nFULL RESPONSE:")
print(bug_response)

print("\nCONTENT:")
print(bug_response.content)

# ==========================================
# AGENT 4 - TEST BUG ANALYSIS
# ==========================================

print("\n" + "=" * 70)
print("AGENT 4 - TEST BUG ANALYSIS")
print("=" * 70)

bug_analysis = bug_analysis_agent.invoke({
    "requirement": requirement,
    "analysis": analysis,
    "test_cases": test_cases,
    "test_data": test_data
})

bug_analysis = bug_analysis.content

print(bug_analysis)

print("\nFULL RESPONSE:")
print(bug_analysis)

print("\nCONTENT:")
print(bug_analysis.content)
