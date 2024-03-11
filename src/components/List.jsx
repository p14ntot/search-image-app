import { useState,useEffect } from "react";

const List = () => {
    const [allPhotos, setAllPhotos] = useState([]); 

    const access_key = 'x0xSg1JYYEt9TbqnrqbX5qTXtNckqRYZ-t7smHQ2TtY';
    const collection_id = '323917';
    
    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const firstResponse = await fetch(`https://api.unsplash.com/collections/${collection_id}?client_id=${access_key}`);
                const dataFirst = await firstResponse.json();
                console.log(dataFirst);
                const totalPhotos = dataFirst.total_photos;
                console.log(totalPhotos);
            
                let collectPhotos = [];
                let page = 1;
                const perPage = 30; // Μέγιστος αριθμός φωτογραφιών που μπορούμε να λάβουμε ανά αίτημα
            
                while (collectPhotos.length < totalPhotos) {
                    const response = await fetch(`https://api.unsplash.com/collections/${collection_id}/photos?per_page=${perPage}&page=${page}&client_id=${access_key}`);
                    const data = await response.json();
                    collectPhotos = [...collectPhotos, ...data];
                    page++;
                }
            
                console.log(collectPhotos);
                setAllPhotos(collectPhotos); 
            } catch (error) {
                console.error(`Fetch error: ${error.message}`);
            }
        };

        fetchCollection();
    }, []); 
    
    return (
        <>
            <div className=" flex items-center justify-center mt-10 ">
                <p className=" font-extrabold  text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-red-950">Here is a collection of mountains!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4">

                {allPhotos.map((photo, index) => (
                    <div className=" w-auto h-auto flex flex-col justify-center items-center mt-6">
                        <img key={index} src={photo.urls.thumb} alt={photo.alt_description} />
                        <p className=" mt-3 text-center"><span className=" font-bold">Photographer's name:</span>  {photo.user.name}</p>
                        <p  className=" mt-3 text-center"><span className=" font-bold">Description:</span>   {photo.alt_description}</p>
                        <p  className=" mt-3 text-center"><span className=" font-bold">Created at:</span>   {photo.created_at.split("T")[0]}</p>
                        <p  className=" mt-3 text-center"><span className=" font-bold">Likes:  </span>   {photo.likes}</p>

                    </div>
                ))}
            </div>
        </>
    );
};

export default List;
