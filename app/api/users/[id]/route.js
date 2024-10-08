import { users } from "@/app/utils/db";
import { NextResponse } from "next/server";
import fs from "fs";

// 2. Get Specific User
export async function GET(_, res) {
  const { id } = await res.params;
  const user = users.filter((u) => u.id === id);
  return NextResponse.json({ user }, { status: 200 });
}

// 3. Login
export async function POST(req, res) {
  let { name, email, password } = await req.json();
  const { id } = await res.params;

  const {
    name: uName,
    email: uEmail,
    password: uPassword,
  } = users.find((u) => u.id === id);

  if (uName === name && uEmail === email && uPassword === password) {
    return NextResponse.json({ result: "Successfully logged in" });
  } else if (!name || !email || !password) {
    return NextResponse.json({ result: "Please fill all the input field" });
  } else {
    return NextResponse.json({ result: "Invalid Credentials" });
  }
}

// 6. Delete User
export async function DELETE(req, res) {
  const { id } = await res.params;

  // Find the index of the user to delete in the users array
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return NextResponse.json({ result: "User not found" }, { status: 404 });
  }

  // Remove the user from the users array
  users.splice(userIndex, 1);

  // Extract just hte user array from the updated data
  const updatedUsersArray = users;

  // Convert the updated users array to a JSON string
  const updatedData = JSON.stringify(updatedUsersArray, null, 2);

  // Write the updated users array to a JSON string
  fs.writeFileSync(
    "./app/utils/db.js",
    `export const users = ${updatedData};`,
    "utf-8"
  );

  return NextResponse.json({ result: "User successfully deleted" });
}
