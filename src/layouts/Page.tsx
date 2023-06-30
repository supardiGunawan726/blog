import { Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import "../styles/fonts.css";

type Props = {
  children: JSX.Element;
  title: string;
  description?: string;
};

export default function Page({ children, title, description }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <Show when={description}>
          <meta name="description" content={description} />
        </Show>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="use-credentials"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body class="bg-theme-bg">{children}</body>
    </html>
  );
}
