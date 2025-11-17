import bcrypt

def generate_hash(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

admin_pass = "admin123"
user_pass = "usuario123"

print(f"Hash Admin: {generate_hash(admin_pass)}")
print(f"Hash User: {generate_hash(user_pass)}")