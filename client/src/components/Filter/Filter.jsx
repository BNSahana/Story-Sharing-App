import React from "react";
import styles from "./Filter.module.css";
import filters from "../../constants/data";

const Filter = ({ handleSelectFilters, selectedFilters }) => {
  return (
    <div className={styles.filter__container}>
      {filters.map((filter, index) => (
        <div
          key={index}
          onClick={() => handleSelectFilters(filter.name)}
          style={{
            border: selectedFilters.includes(filter.name)
              ? "4px solid red"
              : "4px solid transparent",
          }}
          className={`${styles.filter__wrapper} ${
            selectedFilters.includes(filter.name) && styles.selected
          }`}
        >
          <div
            style={{
              backgroundImage: `url(${filter.imageUrl})`,
            }}
            className={styles.filter__box}
          />
          <div className={styles.filter__name}>{filter.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Filter;
