import React, { useState } from "react";
import { Button, Drawer } from "@mui/material";

const FavoritesDrawer = ({ favorites, handleFavorite }) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);

  return (
    <div>
      <Button onClick={toggleDrawer} variant="contained" color="primary">
        Open Favorites
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <div role="presentation" style={{ padding: 20 }}>
          <h3>Cryptocurrency List</h3>
          <ul className="list-group mb-4">
            {favorites.length === 0 ? (
              <li className="list-group-item text-muted">
                No favorites added yet.
              </li>
            ) : (
              favorites.map((favorite) => (
                <li
                  key={favorite.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <img
                      src={favorite.image}
                      alt={favorite.name}
                      width="25"
                      height="25"
                      className="me-2"
                    />
                    {favorite.name}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleFavorite(favorite)}
                  >
                    Remove
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </Drawer>
    </div>
  );
};

export default FavoritesDrawer;
