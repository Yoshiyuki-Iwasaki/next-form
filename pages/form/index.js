import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useForm } from "react-hook-form";
import fetch from "node-fetch";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useRef } from "react";

export default function form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const reRef = useRef();

  const onSubmit = async (formData) => {
    const token = await reRef.current.executeAsync();
    const response = await fetch("api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        mail: formData.mail,
        content: formData.content,
        token,
      }),
    });

    try {
      if (response.data.status == 200) {
        console.log("success");
      }
    } catch (err) {
      console.log(err);
    }
    location.href = "/form/thanks";
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">name</label>
          <input
            id="name"
            aria-invalid={errors.name ? "true" : "false"}
            {...register("name", { required: true, maxLength: 30 })}
          />
          {/* use role="alert" to announce the error message */}
          {errors.name && errors.name.type === "required" && (
            <span role="alert">This is required</span>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <span role="alert">Max length exceeded</span>
          )}

          <label htmlFor="mail">mail</label>
          <input
            id="mail"
            aria-invalid={errors.name ? "true" : "false"}
            {...register("mail", { required: true, maxLength: 30 })}
          />
          {/* use role="alert" to announce the error message */}
          {errors.name && errors.name.type === "required" && (
            <span role="alert">This is required</span>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <span role="alert">Max length exceeded</span>
          )}

          <label htmlFor="content">content</label>
          <input
            id="content"
            aria-invalid={errors.name ? "true" : "false"}
            {...register("content", { required: true, maxLength: 30 })}
          />
          {/* use role="alert" to announce the error message */}
          {errors.name && errors.name.type === "required" && (
            <span role="alert">This is required</span>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <span role="alert">Max length exceeded</span>
          )}

          <input type="submit" />
        </form>
      </main>

      <ReCAPTCHA
        sitekey="6LfeXzsbAAAAAMdJLThhcvSXUtfgUrjAA4nOETIf"
        size="invisible"
        ref={reRef}
      />

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}