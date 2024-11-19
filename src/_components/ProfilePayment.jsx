import React from "react";

const ProfilePayment = () => {
  const cards = [
    {
      id: 1,
      type: "Visa",
      number: "XXXX-XXXX-XXXX-1234",
      validity: "02/2029",
      default: true,
      image: "/images/visa.png",
    },
    {
      id: 2,
      type: "Mastercard",
      number: "XXXX-XXXX-XXXX-3214",
      validity: "02/2029",
      default: false,
      image: "/images/master.png",
    },
    {
      id: 3,
      type: "Maestro",
      number: "XXXX-XXXX-XXXX-8765",
      validity: "02/2029",
      default: false,
      image: "/images/maestro.png",
    },
    {
      id: 4,
      type: "American Express",
      number: "XXXX-XXXX-XXXX-4536",
      validity: "02/2029",
      default: false,
      image: "/images/AmericanExpress.png",
    },
  ];

  const handleDelete = (id) => {
    console.log(`Delete card with id: ${id}`);
  };

  const handleMakeDefault = (id) => {
    console.log(`Make card with id: ${id} default`);
  };

  return (
    <div>
      <h2 className="text-black font-extrabold mb-6">Payments</h2>
      <h5 className="text-black font-extrabold mb-2">Saved Cards</h5>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              //   flex: "1 1 calc(50% - 20px)",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              gap: "16px",
              width: "48%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div>
                <img src={card.image} />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    marginBottom: "5px",
                  }}
                >
                  {card.number}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#888",
                  }}
                >
                  Valid till {card.validity}
                </p>
              </div>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(card.id)}
              >
                DELETE
              </button>
            </div>
            <div>
              {card.default ? (
                <button
                  style={{
                    backgroundColor: "#F4F4F4",
                    color: "#000000",
                    padding: "4px 20px",
                    borderRadius: "30px",
                  }}
                >
                  Default
                </button>
              ) : (
                <button
                  style={{ color: "#4BAF50", textDecoration: "underline" }}
                  onClick={() => !card.default && handleMakeDefault(card.id)}
                >
                  Make Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "14px",
          color: "#fff",
          backgroundColor: "#FF6D2F",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Card
      </button>
    </div>
  );
};

export default ProfilePayment;
