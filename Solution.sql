-- Delete the table if it exits
DROP TABLE orders;

-- Create a table for 'orders'
CREATE TABLE orders(
    customer        VARCHAR(255) NOT NULL,
    ordernumber     SERIAL,
    ordervalue      INT, 
    PRIMARY KEY (ordernumber),
    UNIQUE (ordernumber),
    CHECK (ordervalue >= 0)
);

-- Insert Table 'orders' data
INSERT INTO orders(customer, ordernumber, ordervalue)
VALUES ('jim', DEFAULT, 12345);

INSERT INTO orders(customer, ordernumber, ordervalue)
VALUES ('frank', DEFAULT, 5699);

INSERT INTO orders(customer, ordernumber, ordervalue)
VALUES ('larry', DEFAULT, 14778);

INSERT INTO orders(customer, ordernumber, ordervalue)
VALUES ('jim', DEFAULT, 1236);

INSERT INTO orders(customer, ordernumber, ordervalue)
VALUES ('frank', DEFAULT, 3665);

INSERT INTO orders(customer, ordernumber, ordervalue)
VALUES ('larry', DEFAULT, 1248);

INSERT INTO orders(customer, ordernumber, ordervalue)
VALUES ('larry', DEFAULT, 3265);

INSERT INTO orders(customer, ordernumber, ordervalue)
VALUES ('jim', DEFAULT, 154);

INSERT INTO orders(customer, ordernumber, ordervalue)
VALUES ('frank', DEFAULT, 1444);

INSERT INTO orders(customer, ordernumber, ordervalue)
VALUES ('larry', DEFAULT, 252);

-- Query: Calculate the total value of all orders for each customer 
-- Implicit Join solution: single relation query using aggregation and group by
SELECT customer, SUM(ordervalue) 
FROM orders 
GROUP BY customer

-- Explicit Join solution: same as implicit solution due to only one relation query involved 
SELECT customer, SUM(ordervalue) 
FROM orders 
GROUP BY customer