"use client";
import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import { PreviewSuspense } from "next-sanity/preview";
import imageUrlBuilder from "@sanity/image-url";
import ClientSideRouter from "../../layouts/components/ClientSideRoute";

// import { Base } from "types";

const query = groq`
*[_type == "post"] {
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`;

export default async function Home() {
  const posts = await client.fetch(query);
  // const builder = imageUrlBuilder(client);
  const builder = imageUrlBuilder({
    // baseUrl: 'http://localhost:3000',
    projectId: "izg795vi",
    dataset: "production",
  });
  const urlFor = (source) => builder.image(source);
  const imageUrl = urlFor(
    "image-0f23f736ed2ce5c30c03af3a04cdb22e88d59635-3354x1804-png"
  )
    .auto("format")
    .fit("max")
    .width(720)
    .toString();

  return (
    <div>
      <div className="border-[#f7ab0a] mb-10">
        <PreviewSuspense fallback="Loading...">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {posts.map((post) => (
              <ClientSideRouter  key={post._id} route={`post/${post.slug.current}`}
                
              >
                <div  className="flex flex-col group cursor-pointer">
                  <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out ">
                    <Image
                      className="object-cover object-left lg:object-center"
                      src={imageUrl}
                      width={300}
                      height={300}
                      alt={post.author.name}
                    />
                    <div className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white p-5 flex justify-between ">
                      <p className="font-bold">{post.title}</p>
                      <p>
                        {new Date(post._createdAt).toLocaleDateString("ko-KR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#f7ab0a] text-center text-black px-3 py-1 rounded-full text-sm font-semibold ">
                    {post.categories.map((category) => (
                      <div key={category.title}>
                        <p>{category.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex-1">
                    <p className="underline text-lg font-bold">{post.title}</p>
                    <p className="line-clamp-2 text-gray-500">
                      {post.description}
                    </p>
                  </div>
                </div>
              </ClientSideRouter>
            ))}
          </div>
        </PreviewSuspense>
      </div>
    </div>
  );
}
