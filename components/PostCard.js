import Image from 'next/image'
import { motion } from 'framer-motion'

const PostCard = ({ title, author, imageUrl, price }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="post-card">
      <Image src={imageUrl} alt={title} width={300} height={200} className="rounded-t-lg" />
      <div className="p-4 bg-black text-white">
        <h3 className="font-bold">{title}</h3>
        <p>By {author}</p>
        <div className="flex justify-between items-center mt-2">
          <span>${price}</span>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buy
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default PostCard
