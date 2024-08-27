"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Home = () => {
  const router = useRouter();

  const navigate = (page) => {
    router.push(page);
  };

  return (
    <section>
      <h1> useRouter </h1>
      <button onClick={() => navigate("about")}> Go to about page</button>
    </section>
  );
};

export default Home;
