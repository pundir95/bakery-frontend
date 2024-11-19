import React from 'react'

const ProfileFavourite = () => {

    const favorites = [
        { id: 1, name: "Premium Cookies", price: "$10", image: "/images/sliced-bread.png" },
        { id: 2, name: "Premium Cookies", price: "$10", image: "/images/sliced-bread.png" },
        { id: 3, name: "Premium Bread", price: "$10", image: "/images/sliced-bread.png" },
        { id: 4, name: "Premium Cookies", price: "$10", image: "/images/sliced-bread.png" },
        { id: 5, name: "Premium Cookies", price: "$10", image: "/images/sliced-bread.png" },
        { id: 6, name: "Premium Cookies", price: "$10", image: "/images/sliced-bread.png" },
        { id: 7, name: "Premium Bread", price: "$10", image: "/images/sliced-bread.png" },
        { id: 8, name: "Premium Cookies", price: "$10", image: "/images/sliced-bread.png" },
      ];

  return (
    <div className="w-full">
        <h3 className="text-black font-extrabold mb-2">In Transit Orders</h3>
        <div style={{display:'flex', flexWrap:'wrap', gap:'8px'}}>
            {favorites.map((favorite) => (
                <div key={favorite.id} className="gap-2 mb-2 border h-64 w-56 rounded-lg flex flex-col justify-between p-4 cursor-pointer">
                    <div className='h-4/5'>
                    <img src={favorite.image} alt={favorite.name} className="" />
                    </div>
                    <div className='flex flex items-center justify-between'>
                        <div className="text-black font-semibold text-sm">{favorite.name}</div>
                        <div className="font-semibold" style={{color:'#FF2F2F'}}>{favorite.price}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProfileFavourite