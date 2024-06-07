import BorderedButton from "@/components/Buttons/BorderedButton";
import ImagesView from "@/components/ImagesView";
import ImageTypesHeader from "@/components/ImageTypesHeader";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { getImages } from "./actions";
import { ToastContainer } from "react-toastify";
import { CartContextProvider } from "@/components/context/CartContext";

export default async function Home({
  searchParams
}: {
    searchParams?: {
      query?: string;
    };
}) {
  const query = typeof searchParams?.query === "string" ? searchParams.query : undefined
  const initialImagesData = query && await getImages(1, query)

   
    if(!query || !initialImagesData) return  <CartContextProvider><main className="text-xs bg-gray-100 min-h-screen font-sans  flex flex-col justify-between">
    <Navbar/>
    <div className="flex flex-col flex-grow items-center justify-center">
      <SearchBar/>
      {(query && !initialImagesData) && <p>No search results found.</p>}
    </div>

    <p className="mt-10 p-5 bg-green-300 text-base font-bold text-center">366,681,625 stock photos, 360&deg; panaromic images, vectors and videos</p>
    <div className="p-6 bg-black text-base font-bold text-center space-y-3">
        <h3 className="text-2xl font-bold text-white">My Image Search</h3>
        <p className="text-white font-normal">Changing the world one image at a time.</p>
    </div>
  </main>
  </CartContextProvider>

  return (
    <CartContextProvider>
      <main className="text-xs bg-gray-100 min-h-screen font-sans flex flex-col">
        <Navbar/>

        <SearchBar search={query}/>

        <ImageTypesHeader/>

        <ImagesView initialData={initialImagesData} query={query}/>
        <p className="py-2 px-4">Search Results for {query} Stock Photos and Images ({initialImagesData.total_results})</p>


        <div className="align-end"> 
            <p className="mt-10 p-5 bg-green-300 text-base font-bold text-center">366,681,625 stock photos, 360&deg; panaromic images, vectors and videos</p>
            <div className="p-6 bg-black text-base font-bold text-center space-y-3">
              <h3 className="text-2xl font-bold text-white">My Image Search</h3>
              <p className="text-white font-normal">Changing the world one image at a time.</p>
            </div>
        </div>


        <ToastContainer/>
      </main>
    </CartContextProvider>
  );
}
