import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import styles from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  const price = props.price;
  return (
    <div className={styles.buildControls}>
      <p>
        <strong>Total Price: ${price.toFixed(2)}</strong>
      </p>
      {controls.map((controlItem) => {
        return (
          <BuildControl
            type={controlItem.type}
            label={controlItem.label}
            key={controlItem.label}
            disabled={props.disabled[controlItem.type]}
            add={() => props.ingredientAdded(controlItem.type)}
            remove={() => props.ingredientRemoved(controlItem.type)}
          />
        );
      })}
      <button className={styles.orderButton} disabled={price <= 0}>
        ORDER
      </button>
    </div>
  );
};

export default buildControls;
