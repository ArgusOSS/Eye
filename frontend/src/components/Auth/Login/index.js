import { useState, useEffect } from "react";
import Router from "next/router";
import { loginUser } from "../../../../lib/auth";
import { removeToken } from "../../../../lib/token";
import { useCookies } from "react-cookie"
import { Divider, Button, PasswordInput, Group, TextInput, Text, Image, ActionIcon } from '@mantine/core';
import Link from 'next/link';
import { IconBrandGoogle } from "@tabler/icons";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cookie, setCookie] = useCookies(["user"])

  useEffect(() => {
    // Remove the User's token which saved before.
    removeToken();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const to_forward = "/dashboard/"
      setIsLoading(true);
      // API call:
      const data = await loginUser(email, password);

      if (data && data.tokens) {
        setCookie("user", JSON.stringify(data), {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        })
        setTimeout(() => {
          Router.push();
        }, 1000);
      } else {
        setErrorMessage("Invalid Credentials!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const GoogleIcon = () => {
    return (
      <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={20} height={20} />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="text-light">
        <div className="row">
            <div className="col d-flex justify-content-center">
              <Button variant={"outline"} leftIcon={<GoogleIcon />}>
                <Text>Login with Google</Text>
              </Button>
            </div>
        </div>
        <Divider label={<Text>Or continue with email</Text>} labelPosition="center" my="lg" />
        <div className="mb-3">
        <TextInput
          placeholder="example@gmail.com"
          label="Email"
          withAsterisk
          type="email"
        />
        </div>
        <div className="mb-3">
            <PasswordInput
            // value={password}
            onChange={setPassword}
            placeholder="Your password"
            label="Password"
            required
            />

        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
      
      <div className="row">
        <div className="col d-flex justify-content-center">
        <Group position="right" mt="md">
          {/* <Button type="submit">Submit</Button> */}
          <Button color="ocean-blue" type="submit" className="btn btn-light" disabled={isLoading}>
            <Text>Login</Text>
          </Button>
        </Group>
        </div>
      </div>
      </fieldset>
    </form>
  );
}
