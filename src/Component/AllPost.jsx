import { Fragment,useState, useEffect } from 'react';
import { Menu,Transition } from '@headlessui/react'
import TextEditor from "./TextEditor"

const AllPost =()=>{
  
  const [data, setData] = useState([]);
const [showPopupEdit, setShowPopupEdit] = useState(true);


  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blog/');
        const result = await response.json();
        console.log("data from api to show all post", result.data)
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    // Call the fetch data function
    fetchData();
    // console.log(data)
}, []); 
// Empty dependency array ensures the effect runs only once after initial render

    
//delete operation

  const handleDelete = async (itemId) => {
    // console.log(itemId,'hello check it')
    // Send a DELETE request to the server
    try {
      await fetch(`/api/blog/${itemId}`, {
        method: 'DELETE',
      });

      // Check if the deletion was successful (status code 204)
         } catch (error) {
      console.error('Error deleting item:', error);
    }
  };






  //Edit form Pages nefor and after submit or update blog page
   






const [image, setImage] = useState('');
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [category, setCategory] = useState('');
const [featured, setFeatured] = useState(false);
const [status, setStatus] = useState(true);
const [metaTitle, setMetaTitle] = useState('');
const [description, setDescription] = useState('');
const [author, setAuthor] = useState('');
const [MyId, setMyId] = useState('');


//Edit button effect

const handleEdit=(index)=>{

  setImage(index.fImage)
  setTitle(index.title)
  setContent(index.content)
  setCategory(index.category)
  setFeatured(index.isFeatured)
  setStatus(index.status)
  setMetaTitle(index.meta.title)
  setDescription(index.meta.description)
  setAuthor(index.meta.author)

setMyId(index._id)
console.log(index)
}



useEffect(() => {
  // This effect will run when the component mounts
    // You can use it to show the popup after a delay, for example
    const timeoutId = setTimeout(() => {
      setShowPopupEdit(false);
    }, 2000); // Show popup after 2000 milliseconds (2 seconds)
    
    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array means the effect runs only once when the component mounts

  const closePopup = () => {
    setShowPopupEdit(true);
  };
  

  // LAst Submitted
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit")
    
    // Create FormData object to send files and other data
    const formData = new FormData();
  formData.append('fImage', image);
  formData.append('title', title);
  formData.append('content', content);
  formData.append('category', category);
  formData.append('isFeatured', featured);
  formData.append('status', status);
  formData.append('metaTitle', metaTitle);
  formData.append('metaDescription', description);
  formData.append('metaAuthor', author);
  console.log(formData)
  console.log(MyId)
  
  try {
    const response = await fetch(`/api/blog/${MyId}`, {
      method: 'PATCH',
      body:formData
    });

    if (response.ok) {  
      // Handle success
      console.log('Data submitted successfully');
      setShowPopupEdit(false)
    } else {
      // Handle error
      console.error('Failed to submit data');
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};

  return (


<div>

      {showPopupEdit && (
        <div className="popup absolute bg-white flex justify-center items-center">

          
           <form onSubmit={handleSubmit}>
  <div>
    <div className="">
      <h1 className="text-2xl font-extrabold">Add New Post</h1>
    </div>
    <div>  
    <section aria-label="File Upload Modal"  className="relative h-full flex flex-col rounded-md">
        <label className="py-2 text-">Featured Image</label>
        <section className="h-full overflow-auto p-8 w-full  flex flex-col">
          <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            <input id="hidden-input" type="file" onChange={(e) => setImage(e.target.files[0])} multiple className="" />
          </header>
        </section>
      </section>
  
  <div className="-mx-3 flex gap-2 flex-wrap">
      <div className="w-full px-3">
      <div className="mb-5">
      <label htmlFor="fName" className="mb-3 block text-base font-medium text-[#07074D]">
      Title
      </label>
      <input type="text" name="fName" id="fName" placeholder="What going on ..." value={title}
      onChange={(e) => setTitle(e.target.value)} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
      </div>
      </div>
      <div className="w-full px-3">

      <TextEditor handleContent={setContent} />

      </div>
      <div className="w-full px-3">
      <div className="mb-5">
      <label htmlFor="lName" className="mb-3 block text-base font-medium text-[#07074D]">
       Choose Category
        </label>
        <select type="text" name="lName" id="lName" placeholder="My First Blog"  value={category}
        onChange={(e) => setCategory(e.target.value)} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" >
          <option value="Programming">Programming</option>
          <option value="Artificial-inteligence">Artificial-inteligence</option>
          <option value="Cryptography">Cryptography</option>
        </select>
        </div>
      </div>
      <div className="w-full px-3">
      <div className="mb-5">
      <label htmlFor="lName" className="mb-3 block text-base font-medium text-[#07074D]">
       isFeatured
        </label>
        <select type="text" name="lName" id="lName" placeholder="My First Blog"  defaultValue={featured}
        onChange={(e) => setFeatured(e.target.value)} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" >
         <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        </div>
      </div>
      <div className="w-full px-3">
      <div className="mb-5">
      <label htmlFor="lName" className="mb-3 block text-base font-medium text-[#07074D]">
      Status
        </label>
        <select type="text" name="lName" id="lName" defaultValue={status}
        onChange={(e) => setStatus(e.target.value)} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" >
          <option value={true}>Active</option>
          <option value={false}>In-Active</option>
        </select>
        </div>
      </div>
      <div className="w-full px-3">
      <div className="mb-5">
      <label htmlFor="lName" className="mb-3 block text-base font-medium text-[#07074D]">
        Meta Title
        </label>
        <input type="text" name="lName" id="lName" placeholder="My First Blog"  value={metaTitle}
        onChange={(e) => setMetaTitle(e.target.value)} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
      </div>
      <div className="w-full px-3">
      <div className="mb-5">
        <label htmlFor="lName" className="mb-3 block text-base font-medium text-[#07074D]">
        Meta Description
        </label>
        <input type="text" name="lName" id="lName" placeholder="hi its blog description"  value={description}
        onChange={(e) => setDescription(e.target.value)} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
        
      </div>
      <div className="w-full px-3">
      <div className="mb-5">
        <label htmlFor="lName" className="mb-3 block text-base font-medium text-[#07074D]">
        Meta Author (default:devzox)
        </label>
        <input type="text" name="lName" id="lName" placeholder="devzox"  value={author}
        onChange={(e) => setAuthor(e.target.value)} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
        
      </div>
          </div>
              
              <div>
              {/* component */}
              <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
          
  </div>
  
  
  <div>
      <button onClick={()=>setShowPopupEdit(false)}  className="hover:shadow-form rounded-md bg-[#6A64F1] mt-4 py-3 px-8 text-center text-base font-semibold text-white outline-none">
  cancle
  </button>
  <button className="hover:shadow-form rounded-md bg-[#6A64F1] mt-4 py-3 px-8 text-center text-base font-semibold text-white outline-none">
  Submit
  </button>
  
  </div>
  
      </div>
    </div>
              </form> 


        </div>
      )}
    
    




    <section className="container px-4 mx-auto">
     <div className="sm:flex sm:items-center sm:justify-between">
     <div className="">
    <h1 className="text-xl">All Post</h1>
    </div>

          {/* <h2 className="text-lg font-medium">Files uploaded</h2> */}
          <div className="flex items-center mt-4 gap-x-3">
            {/* <button className="w-1/2 px-5 py-2 text-sm transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-white dark:border-gray-700">
              Download all
            </button> */}
            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3098_154395)">
                  <path d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_3098_154395">
                    <rect width={20} height={20} fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>Add New</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right  dark:text-gray-400">
                        <div className="flex items-center gap-x-3">
                          <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                          <span>Feature Image</span>
                        </div>
                      </th>
                      <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right  dark:text-gray-400">
                        Title
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right  dark:text-gray-400">
                    Category
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right  dark:text-gray-400">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right  dark:text-gray-400">
                        IsFeatured
                      </th>
            
                      <th scope="col" className="relative py-3.5 px-4 dark:text-gray-400">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  
                  {data.length > 0 ? (
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    
            {data.map((index) => (
              // <img src={item.meta} alt={imageData.title} />
            
              <tr key={index._id}>
                 
                  <td className="px-12 py-4 text-sm font-normal dark:text-gray-300 whitespace-nowrap">
                  <img src={index.fImage} className='w-20 h-20' /> </td>
                  <td  className="px-4 py-4 text-sm  dark:text-gray-300 whitespace-nowrap">{index.title}</td>
                  <td  className="px-4 py-4 text-sm  dark:text-gray-300 whitespace-nowrap">{index.category}</td>
                  <td  className="px-4 py-4 text-sm whitespace-nowrap">{index.status? "Active": "in-Active"}</td>
                  <td  className="px-4 py-4 text-sm whitespace-nowrap">{index.isFeatured? "Yes" :"No" }</td>

                  
                  <td className="px-4 py-4 text-sm whitespace-nowrap">

                <Menu as="div" className="overflow-hidden text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                  </button>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 right-20 mt-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
     
              <Menu.Item>
                {({ active }) => (
  
  <button onClick={ ()=>{closePopup(); handleEdit(index);}}
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    
                   View Blog
                  </button>
                )}
              </Menu.Item>
            </div>
           <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                     onClick={ ()=> handleDelete(index._id)}
                  >
                    
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
                 
                </td>
                </tr>
                
      
            ))}
            </tbody>
            ) : (
          <p>Loading...</p>
        )}
                   
                
                  </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            <span>
              previous
            </span>
          </a>
          <div className="items-center hidden md:flex gap-x-3">
            <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
            <a href="#" className="px-2 py-1 text-sm  rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
            <a href="#" className="px-2 py-1 text-sm  rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
            <a href="#" className="px-2 py-1 text-sm  rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
            <a href="#" className="px-2 py-1 text-sm  rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
            <a href="#" className="px-2 py-1 text-sm  rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
            <a href="#" className="px-2 py-1 text-sm  rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
          </div>
          <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <span>
              Next
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </section>
      
        </div>

    )
}


export default AllPost