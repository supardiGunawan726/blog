import type { CollectionEntry } from "astro:content";
import { For, Show, createMemo, createSignal } from "solid-js";
import searchIcon from "../assets/icons/search.svg";
import * as dateFns from "date-fns";

type Props = {
  posts: CollectionEntry<"posts">[];
  search?: boolean;
};

export default function BlogList({ posts, search = true }: Props) {
  const [searchQuery, setSearchQuery] = createSignal("");

  const filteredPosts = createMemo(() =>
    !searchQuery()
      ? posts
      : posts.filter(
          (post) =>
            post.slug.includes(searchQuery()) ||
            post.data.title.includes(searchQuery()) ||
            post.data.description.includes(searchQuery())
        )
  );

  return (
    <div>
      <Show when={search}>
        <header class="flex items-center gap-3 mb-6">
          <label for="search" class="cursor-pointer">
            <img {...searchIcon} alt="Search icon" />
          </label>
          <input
            value={searchQuery()}
            oninput={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            id="search"
            class="block w-full bg-transparent font-Inter text-white placeholder:text-theme-text focus:outline-none"
            placeholder="Search something"
          />
        </header>
      </Show>
      <ul>
        <For each={filteredPosts()}>
          {(post) => (
            <li>
              <section class="md:flex md:flex-row-reverse md:gap-4">
                <a href={`/blog/${post.slug}`}>
                  <figure class="rounded-[10px] overflow-hidden md:w-[300px] md:mt-1">
                    <img src={post.data.image} alt={post.data.title} />
                  </figure>
                </a>
                <div>
                  <a href={`/blog/${post.slug}`}>
                    <h4 class="mt-4 font-PlusJakartaSans font-extrabold text-white text-2xl md:mt-0 md:text-[28px] md:leading-tight">
                      {post.data.title}
                    </h4>
                  </a>
                  <p class="font-Inter text-theme-text leading-normal mt-2">
                    {dateFns.format(post.data.createdAt, "MMM dd, yyyy")}
                  </p>
                  <a href={`/blog/${post.slug}`}>
                    <p class="font-Inter text-theme-text leading-normal text-lg mt-2">
                      {post.data.description}
                    </p>
                  </a>
                </div>
              </section>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
