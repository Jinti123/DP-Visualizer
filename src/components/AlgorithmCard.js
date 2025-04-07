import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./AlgorithmCard.css";

const AlgorithmCard = ({ id, name, description, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="algorithm-card"
    >
      <Link to={`/${id}`} className="card-link">
        <div className="card-icon">{icon}</div>
        <div className="card-content">
          <h3>{name}</h3>
          <p>{description}</p>
          <div className="explore-link">
            <span>Explore</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AlgorithmCard;
