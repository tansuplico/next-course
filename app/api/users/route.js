import { users } from "@/app/utils/db";
import { NextResponse } from "next/server";
import fs from "fs";

// 1. All users data
export function GET() {
  const data = users;
  return NextResponse.json({ data }, { status: 200 });
}

// 4. Create User
export async function POST(req, res) {
  let { id, name, email, password } = await req.json();

  // Check if the data is provided
  if (!id || !name || !email || !password) {
    return NextResponse.json(
      { result: "Please fill all the input field" },
      { status: 400 }
    );
  } else {
    // Add the new user to the in memory array
    users.push({ id, name, email, password });

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

    return NextResponse.json({ result: "User successfully created" });
  }
}

// 5. Update User

export async function PUT(req, res) {
  let { id, name, email, password } = await req.json();

  // Find the user in the users array by ID
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return NextResponse.json({ result: "User not found" }, { status: 404 });
  }

  if (name) {
    users[userIndex].name = name;
  }
  if (email) {
    users[userIndex].email = email;
  }
  if (password) {
    users[userIndex].password = password;
  }

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

  return NextResponse.json({ result: "User successfully updated" });
}
