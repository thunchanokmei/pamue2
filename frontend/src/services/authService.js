export const handleLogin = async (email, studentCode) => {
  try {
    const response = await fetch("http://localhost:5001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, studentCode }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data; // ส่งข้อมูลผู้ใช้กลับไป
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // ส่งข้อผิดพลาดกลับไป
  }
};