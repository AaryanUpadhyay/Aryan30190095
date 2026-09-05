from llm_config import chat_model

response = chat_model.invoke(
    "Generate 5 test cases for an ecommerce website login"
)

print("RESPONSE:", response)
print("RESPONSE TYPE:", type(response))