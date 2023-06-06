"use client";
import { groq } from "next-sanity";
import { client } from "../../../../lib/sanity.client";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/components/RichTextComponents";

type Props = {
  params: {
    slug: string;
  };
};

async function Post({ params: { slug } }: Props) {
  const query = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->
} 
`;

  const post = await client.fetch(query, { slug });
  // console.log(post);

  return (
    <div>
      {slug}
      <PortableText value={post.body} components={RichTextComponents} />
    </div>
  );
}
export default Post;
