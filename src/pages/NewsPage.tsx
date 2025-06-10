// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ArrowLeftIcon, SearchIcon } from "lucide-react";
// import UrbanStudiosFeaturedPostCard from "@/polymet/components/urban-studios-featured-post-card";
// import UrbanStudiosBlogPostCard from "@/polymet/components/urban-studios-blog-post-card";
// import UrbanStudiosBlogCategoryFilter from "@/polymet/components/urban-studios-blog-category-filter";
// import UrbanStudiosBlogPagination from "@/polymet/components/urban-studios-blog-pagination";
// import {
//   BLOG_POSTS,
//   BLOG_CATEGORIES,
//   getFeaturedPosts,
//   getPostsByCategory,
//   searchPosts,
// } from "@/polymet/data/urban-studios-blog-data";

// export default function UrbanStudiosBlogPage() {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS);
//   const [featuredPost, setFeaturedPost] = useState(getFeaturedPosts()[0]);
//   const [isSearchFocused, setIsSearchFocused] = useState(false);

//   const postsPerPage = 6;

//   // Filter posts when category or search query changes
//   useEffect(() => {
//     let posts = [...BLOG_POSTS];

//     // Filter by category
//     if (selectedCategory !== "all") {
//       posts = getPostsByCategory(selectedCategory);
//     }

//     // Filter by search query
//     if (searchQuery.trim()) {
//       posts = searchPosts(searchQuery);
//       if (selectedCategory !== "all") {
//         posts = posts.filter((post) => post.categoryId === selectedCategory);
//       }
//     }

//     // Sort by date (newest first)
//     posts.sort(
//       (a, b) =>
//         new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
//     );

//     setFilteredPosts(posts);
//     setCurrentPage(1); // Reset to first page when filters change
//   }, [selectedCategory, searchQuery]);

//   // Calculate pagination
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
//   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

//   // Handle category change
//   const handleCategoryChange = (categoryId) => {
//     setSelectedCategory(categoryId);
//   };

//   // Handle search change
//   const handleSearchChange = (query) => {
//     setSearchQuery(query);
//   };

//   // Handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="bg-white dark:bg-black min-h-screen">
//       {/* Hero section with featured post */}
//       <section className="relative bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 pt-12 pb-16 px-4 overflow-hidden">
//         {/* Decorative elements */}
//         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//           <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-purple-200/30 dark:bg-purple-900/10 blur-3xl"></div>
//           <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-200/30 dark:bg-blue-900/10 blur-3xl"></div>
//           <div className="absolute -bottom-32 left-1/3 w-64 h-64 rounded-full bg-coral-200/30 dark:bg-coral-900/10 blur-3xl"></div>
//         </div>

//         <div className="container mx-auto max-w-6xl relative">
//           {/* Back to home link */}
//           <div className="mb-8">
//             <Button variant="ghost" asChild className="group">
//               <Link to="/">
//                 <ArrowLeftIcon className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
//                 Back to Home
//               </Link>
//             </Button>
//           </div>

//           <div className="text-center mb-10">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
//               Urban Studios Blog
//             </h1>
//             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               Stay in the rhythm with our latest stories, tips, and studio
//               updates
//             </p>
//           </div>

//           {/* Mobile search */}
//           <div className="md:hidden relative mb-8">
//             <SearchIcon
//               className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors ${
//                 isSearchFocused || searchQuery
//                   ? "text-purple-500"
//                   : "text-gray-400"
//               }`}
//             />

//             <Input
//               type="text"
//               placeholder="Search posts..."
//               className="pl-10 pr-4 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
//               value={searchQuery}
//               onChange={(e) => handleSearchChange(e.target.value)}
//               onFocus={() => setIsSearchFocused(true)}
//               onBlur={() => setIsSearchFocused(false)}
//             />
//           </div>

//           {featuredPost && (
//             <UrbanStudiosFeaturedPostCard
//               id={featuredPost.id}
//               title={featuredPost.title}
//               slug={featuredPost.slug}
//               categoryId={featuredPost.categoryId}
//               authorId={featuredPost.authorId}
//               publishedAt={featuredPost.publishedAt}
//               featuredImage={featuredPost.featuredImage}
//               excerpt={featuredPost.excerpt}
//               readTime={featuredPost.readTime}
//             />
//           )}
//         </div>
//       </section>

//       {/* Blog content section */}
//       <section className="py-12 px-4">
//         <div className="container mx-auto max-w-6xl">
//           {/* Category filter and search */}
//           <UrbanStudiosBlogCategoryFilter
//             selectedCategory={selectedCategory}
//             onCategoryChange={handleCategoryChange}
//             searchQuery={searchQuery}
//             onSearchChange={handleSearchChange}
//           />

//           {/* Blog posts grid */}
//           {currentPosts.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {currentPosts.map((post) => (
//                 <UrbanStudiosBlogPostCard
//                   key={post.id}
//                   id={post.id}
//                   title={post.title}
//                   slug={post.slug}
//                   categoryId={post.categoryId}
//                   authorId={post.authorId}
//                   publishedAt={post.publishedAt}
//                   featuredImage={post.featuredImage}
//                   excerpt={post.excerpt}
//                   readTime={post.readTime}
//                   featured={post.featured}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <h3 className="text-xl font-medium mb-2">No posts found</h3>
//               <p className="text-gray-500 dark:text-gray-400 mb-6">
//                 Try adjusting your search or filter to find what you're looking
//                 for.
//               </p>
//               <Button
//                 onClick={() => {
//                   setSelectedCategory("all");
//                   setSearchQuery("");
//                 }}
//               >
//                 Clear Filters
//               </Button>
//             </div>
//           )}

//           {/* Pagination */}
//           <UrbanStudiosBlogPagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       </section>

//       {/* Newsletter section */}
//       <section className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 py-16 px-4">
//         <div className="container mx-auto max-w-4xl text-center">
//           <h2 className="text-2xl md:text-3xl font-bold mb-4">
//             Stay Updated with Urban Studios
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
//             Subscribe to our newsletter to receive the latest dance tips, class
//             updates, and special event announcements.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//             <Input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-grow"
//             />

//             <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
//               Subscribe
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }