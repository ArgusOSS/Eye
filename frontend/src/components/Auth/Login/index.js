/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { Divider, Button, PasswordInput, Group, TextInput, Text, Image, ActionIcon } from "@mantine/core";
import { IconPassword, IconAt, IconBrandGoogle } from "@tabler/icons";
import Link from "next/link";
import { removeToken } from "../../../../lib/token";
import { loginUser } from "../../../../lib/auth";
import { Loginlogo } from "../../dashboard/Base/_loginlogo";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();

  useEffect(() => {
    // Remove the User's token which saved before.
    removeToken();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const to_forward = "/dashboard/";
      setIsLoading(true);
      // API call:
      const data = await loginUser(email, password);

      if (data && data.tokens) {
        setCookie("user", JSON.stringify(data), {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
        setTimeout(() => {
          router.push(to_forward);
        }, 1000);
      } else {
        setErrorMessage("Invalid Credentials!");
      }
    } catch (error) {
      // add something
    } finally {
      setIsLoading(false);
    }
  }

  function GoogleIcon() {
    return (
      <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={20} height={20} />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="text-light">
        <div className="row">
          <Loginlogo />
          <br />
        </div>
        <br />

        <div className="mb-3">
          <TextInput
            icon={<IconAt size={14} />}
            placeholder="example@gmail.com"
            label="Email"
            withAsterisk
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-3">
          <PasswordInput
            icon={<IconPassword size={14} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <br />

        <div className="col d-flex justify-content-center">
          <Group position="right" mt="md">
            {/* <Button type="submit">Submit</Button> */}
            <Button
              onSubmit={handleSubmit}
              type="submit"
              variant="gradient"
              gradient={{ from: "yellow", to: "orange", deg: 75 }}
              disabled={isLoading}
              size="lg"
              styles={(theme) => ({
                root: {
                  backgroundColor: "#00acee",
                  border: 0,
                  height: 42,
                  paddingLeft: 76,
                  paddingRight: 78,

                  "&:hover": {
                    backgroundColor: theme.fn.darken("#00acee", 0.05),
                  },
                },

                leftIcon: {
                  marginRight: 15,
                },
              })}
            >
              <Text> Login </Text>
            </Button>
          </Group>
        </div>
        <br />
        <br />
        <Divider color="orange.6" label={<Text>Or continue with gmail</Text>} labelPosition="center" my="lg" />

        <div className="row">
          <br />

          <div className="col d-flex justify-content-center">
            <a href="/api/authentication/google" role="button">
              <Button color="orange.2" variant="outline" leftIcon={<GoogleIcon />} size="md">
                <Text>Login with Google</Text>
              </Button>
            </a>
          </div>
        </div>
        <br />
      </fieldset>
    </form>
  );
}
