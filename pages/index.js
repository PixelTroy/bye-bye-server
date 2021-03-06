import Header from "../components/Header";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import React from "react";
import ExternalLink from "../components/ExternalLink";
import Features from "../components/Features";
import matter from "gray-matter";
import BlogList from "../components/BlogList";

export default function Home({ products, posts }) {
  return (
    <>
      <Header />
      <style jsx>
        {`
          .Content {
            color: #1d222d;
            font-size: 1rem;
            justify-content: center;
            padding: 1rem 1rem 5rem 1rem;
            margin: 0;
          }
          main {
            grid-area: Main;
          }
          .Container {
            margin: 1rem;
            display: block;
            width: auto;
            padding: 1rem 2rem 1.5rem 2rem;
            border: 1px solid lightgrey;
            border-radius: 5px;
            background-color: white;
            box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.08),
              0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 4px 8px 0 rgba(0, 0, 0, 0.08);
          }
          .Announcement {
            max-width: 500px;
            margin: auto;
          }
          .Flex {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
          }
          h1,
          h2,
          h3 {
            padding: 0;
            margin: 0;
            margin-bottom: 10px;
            font-weight: 300;
          }
          h2 {
            font-size: 1.2rem;
            font-weight: 400;
          }
          @media only screen and (max-width: 1000px) {
            main {
              grid-area: Main;
              font-size: 1.5rem;
              min-height: 900px;
            }
            .Flex {
              flex-direction: column;
            }
            .Container {
              margin: 10px;
            }
          }
        `}
      </style>
      <div className="grid-container">
        <Navigation />

        <main>
          <div className={"Content"}>
            <div className={"Announcement Container"}>
              <h1>What is this about?</h1>
              Atlassian has given customers advance notice that their Server
              offering will be retired. You can read the detailed announcement
              timeline
              <ExternalLink url="https://www.atlassian.com/migration/key-offering-changes?tab=server-dates#important-dates">
                {" "}
                here
              </ExternalLink>
              .
              <br />
              <br />
              But don't panic - we will create a curated list of alternatives.
              This site is currently work in progress. Feel free to send us a PR
              on{" "}
              <ExternalLink url="https://github.com/realignedtechnologies/bye-bye-server">
                Github
              </ExternalLink>
              .
            </div>
            <br />
            <br />
            <div>
              <h1>Jira Software and Alternatives Comparison</h1>

              <div className={"Flex"}>
                {products.jirasoftware.map((product) => (
                  <div key={product.title} className={"Container"}>
                    <h2>{product.title}</h2>
                    <Features list={product} />
                  </div>
                ))}
              </div>

              <br />
              <br />
              <h1>Jira Service Desk and Alternatives Comparison</h1>

              <div className={"Flex"}>
                {products.jiraservicedesk.map((product) => (
                  <div key={product.title} className={"Container"}>
                    <h2>{product.title}</h2>
                    <Features list={product} />
                  </div>
                ))}
              </div>

              <br />
              <br />
              <h1>Confluence and Alternatives Comparison</h1>

              <div className={"Flex"}>
                {products.confluence.map((product) => (
                  <div key={product.title} className={"Container"}>
                    <h2>{product.title}</h2>
                    <Features list={product} />
                  </div>
                ))}
              </div>

              <br />
              <br />

              <h1>Latest Blog Posts</h1>

              <BlogList posts={posts} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const products = await require("../public/products.json");

  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);
      const value = values[index];
      const document = matter(value.default);
      return {
        slug: slug.replace(".", ""),
        ...document.data,
      };
    });
    return data;
  })(require.context("../_posts/blog", true, /\.mdx$/));

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products,
      posts,
    },
  };
}
