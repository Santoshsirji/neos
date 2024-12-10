"use client";
import React from 'react';

const AboutUs = () => {
  return (
    <div className="p-6     pt-20
    px-2
    sm:px-4
    md:px-8
    lg:px-12
    xl:px-16
    2xl:px-24
    max-w-screen-2xl">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <h2 className="text-3xl font-semibold text-center mb-4">Cosmic Watchers</h2>

      <section className="mb-8">
        <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
        <p className="text-lg text-gray-300">
          At Cosmic Watchers, our mission is to harness the power of technology to enhance public awareness and understanding of NEOs. We believe that by making complex astronomical data accessible and engaging, we can inspire curiosity and promote a greater appreciation for our universe. Our goal is to create an interactive platform that not only informs but also captivates users, empowering them to explore and learn about NEOs in a dynamic way.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-bold mb-2">Meet Our Team</h3>
        <p className="text-lg text-gray-300">
          <strong>Team Leader: Santosh Raut</strong><br />
          Santosh is a visionary leader with a strong background in software development and a deep passion for space science. His expertise in Next.js and React has been pivotal in steering the team’s direction and ensuring seamless integration of technologies. With a knack for innovation and an eye for detail, Santosh is committed to guiding Cosmic Watchers toward success in this exciting hackathon.
        </p>
      </section>
      <section className="mb-8">
        <h3 className="text-2xl font-bold mb-2">Our Vision for the Hackathon</h3>
        <p className="text-lg text-gray-300">
          During this hackathon, our objective is to create an intuitive and visually striking web application that enables users to explore NEOs interactively. We envision a platform where users can:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li>Visualize the orbits of NEOs in 3D space.</li>
          <li>Access detailed information about individual NEOs, including size, composition, and potential impact risks.</li>
          <li>Engage with educational content that demystifies complex astronomical concepts.</li>
          <li>Participate in interactive simulations that illustrate the significance of NEO tracking.</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
