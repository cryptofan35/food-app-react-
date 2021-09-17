import axios from "axios";
import crypto from "crypto";
import JSONbig from "json-bigint";
axios.defaults.transformResponse = [
  function (data) {
    // Do whatever you want to transform the data
    return JSONbig.parse(data);
  },
];
axios.defaults.headers.post["Content-Type"] = "application/json";

export const handleClick = () => {
  return () => {
    fetch("https://partner-api.stg-myteksi.com/grabid/v1/oauth2/token", {
      method: "POST",
      headers: {
        "cache-control": "no-cache",
        "content-type": "application/json",
      },

      body: {
        client_id: "7aad4ad439474af998f4e9cbb7cdb436",
        client_secret: "mIxpyXGOoR5WkQ3M",
        grant_type: "client_credentials",
        scope: "grab_express.partner_deliveries",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const Menus = () => {
  return (dispatch, getState) => {
    const appKey = "02e6d1efd0421de9d49447106cbc90ec";
    // const appKey= "b23302d4a08f53d1bd5bcf333664997d";
    const storeId = "810137705";
    // const storeId = "810137674"
    const token = "80199e23e7cf5a346cf9d8ff67b61039";
    // const token = "8a702142d013e6c93d64c604a3fb332e"
    const version = "1.0";
    const timestamp = Math.floor(Date.now() / 1000);

    function getSign() {
      const signtxt =
        "appKey" +
        appKey +
        "shopIdenty" +
        storeId +
        "timestamp" +
        timestamp +
        "version" +
        version +
        token;
      let hash = crypto
        .createHash("sha256", "utf-8")
        .update(signtxt)
        .digest("hex");
      return hash;
    }
    // make call to server using fetch
    axios
      .post(
        `/cater/dish/categoryAll?appKey=${appKey}&shopIdenty=${storeId}&version=1.0&timestamp=${timestamp}&sign=${getSign()}`,
        {
          transformResponse: (data) => JSONbig.parse(data),
        }
      )
      .then((res) => {
        console.log(res);
        var result = res.data.result
          .filter((item) => item.level !== 1)
          .sort((a, b) => (a.name > b.name ? 1 : -1));
        dispatch({ type: "MENUS", result });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const DishList = (id) => {
  return (dispatch, getState) => {
    const appKey = "02e6d1efd0421de9d49447106cbc90ec";
    // const appKey= "b23302d4a08f53d1bd5bcf333664997d";
    const storeId = "810137705";
    // const storeId = "810137674"
    const token = "80199e23e7cf5a346cf9d8ff67b61039";
    // const token = "8a702142d013e6c93d64c604a3fb332e"
    const version = "1.0";
    const timestamp = Math.floor(Date.now() / 1000);
    dispatch({ type: "Loading" });

    function getSign() {
      const signtxt =
        "appKey" +
        appKey +
        "shopIdenty" +
        storeId +
        "timestamp" +
        timestamp +
        "version" +
        version +
        token;
      let hash = crypto
        .createHash("sha256", "utf-8")
        .update(signtxt)
        .digest("hex");
      return hash;
    }
    // make call to server using fetch
    let body = {
      dishTypeId: id,
    };
    axios
      .post(
        `/cater/dish/dishNew?appKey=${appKey}&shopIdenty=${storeId}&version=1.0&timestamp=${timestamp}&sign=${getSign()}`,
        body
      )
      .then((res) => {
        console.log(res.data);
        var dishes = res.data.result.dishList;
        dispatch({ type: "DISH_LIST", dishes });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const dishMenuById = (dishId, id) => {
  return (dispatch) => {
    const appKey = "02e6d1efd0421de9d49447106cbc90ec";
    // const appKey= "b23302d4a08f53d1bd5bcf333664997d";
    const storeId = "810137705";
    // const storeId = "810137674"
    const token = "80199e23e7cf5a346cf9d8ff67b61039";
    // const token = "8a702142d013e6c93d64c604a3fb332e"
    const version = "1.0";
    const timestamp = Math.floor(Date.now() / 1000);

    dispatch({ type: "Loading" });

    function getSign() {
      const signtxt =
        "appKey" +
        appKey +
        "shopIdenty" +
        storeId +
        "timestamp" +
        timestamp +
        "version" +
        version +
        token;
      let hash = crypto
        .createHash("sha256", "utf-8")
        .update(signtxt)
        .digest("hex");
      return hash;
    }
    // make call to server using fetch
    let body = {
      shopIdenty: 810137705,
      ids: [dishId, id],
    };
    axios
      .post(
        `/cater/dish/dishMenuByIds?appKey=${appKey}&shopIdenty=${storeId}&version=1.0&timestamp=${timestamp}&sign=${getSign()}`,
        body
      )
      .then((res) => {
        console.log(res.data);
        var result = res.data.result;
        dispatch({ type: "dishMenuById", result });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const takeOrder = () => {
  return (dispatch, getState) => {
    dispatch({ type: "Loading" });

    const appKey = "02e6d1efd0421de9d49447106cbc90ec";
    // const appKey= "b23302d4a08f53d1bd5bcf333664997d";
    const storeId = "810137705";
    // const storeId = "810137674"
    const token = "80199e23e7cf5a346cf9d8ff67b61039";
    // const token = "8a702142d013e6c93d64c604a3fb332e"
    const version = "1.0";
    const timestamp = Math.floor(Date.now() / 1000);

    function getSign() {
      const signtxt =
        "appKey" +
        appKey +
        "shopIdenty" +
        storeId +
        "timestamp" +
        timestamp +
        "version" +
        version +
        token;
      let hash = crypto
        .createHash("sha256", "utf-8")
        .update(signtxt)
        .digest("hex");
      return hash;
    }

    const products = getState().item.addedItems;
    var newProducs = products.map((product) => ({
      name: product.name,
      id: product.id,
      tpId: product.tpId,
      quantity: product.quantity,
      price: product.price,
      packagePrice: product.packagePrice,
      packageQuantity: product.packageQuantity,
      totalFee: product.totalFee,
      remark: product.remark,
    }));

    const total = getState().item.total * 100;
    // make call to server
    let body = {
      tpOrderId: "797429342222",
      createTime: timestamp,
      peopleCount: 1,
      shop: {
        shopIdenty: 810137705,
        tpShopId: 810137705,
        shopName: 810137705,
      },
      products: newProducs,
      delivery: {
        expectTime: 0,
        deliveryParty: 1,
        receiverName: "12345678901",
        receiverPhone: "12345678444",
        receiverGender: 1,
        coordinateType: 1,
        delivererAddress:
          "290A BISHAN STREET 24 MULTI STOREY CAR PARK, Singapore, 571290",
        longitude: 88,
        latitude: 90,
      },
      payment: {
        deliveryFee: 0,
        packageFee: 0,
        discountFee: 0,
        platformDiscountFee: 0,
        shopFee: total,
        userFee: total,
        shopDiscountFee: 0,
        serviceFee: 0,
        subsidies: 0,
        totalFee: total,
        payType: 2,
      },
    };

    axios
      .post(
        `/takeout/order/create?appKey=${appKey}&shopIdenty=${storeId}&version=1.0&timestamp=${timestamp}&sign=${getSign()}`,
        body
      )
      .then((res) => {
        console.log(res.data);
        var result = res.data;
        dispatch({ type: "OrderDetails", result });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "OrderError" });
      });
  };
};

export const Rapyd = () => {
  return (dispatch, getState) => {
    const total = getState().item.total;
    const body = {
      country: "SG",
      currency: "SGD",
      amount: total,
      payment_method_type_categories: [
        "cash",
        "bank_redirect",
        "bank_transfer",
        "card",
        "ewallet",
      ],
      complete_payment_url:
        "https://whispering-island-94241.herokuapp.com/success",
      error_payment_url: "https://whispering-island-94241.herokuapp.com/error",
    };

    axios
      .post("https://vast-brook-06837.herokuapp.com/rapyd", body)
      .then((res) => {
        console.log(res);
        var result = res.data;
        dispatch({ type: "Rapyd", result });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const Increment = () => {
  return (dispatch, getState) => {
    dispatch({ type: "INCREMENT" });
    dispatch({ type: "MULTIPLYPRICE" });
  };
};

export const Decrement = () => {
  return (dispatch, getState) => {
    dispatch({ type: "DECREMENT" });
    dispatch({ type: "DIVIDEPRICE" });
  };
};

export const ingredientSum = (id) => {
  return (dispatch) => {
    dispatch({ type: "INGREDIENT_SUM", id });
  };
};

export const ingredientDeduct = (id) => {
  return (dispatch) => {
    dispatch({ type: "INGREDIENT_DEDUCT", id });
  };
};

export const Menu = () => {
  return (dispatch) => {
    dispatch({ type: "MENU" });
  };
};

export const backToMenu = (id) => {
  return (dispatch) => {
    dispatch({ type: "BACK_TO_MENU", id });
  };
};

export const addToCart = (id, selectedOption, selectedChecked, specs) => {
  return (dispatch, getState) => {
    dispatch({
      type: "ADD_TO_CART",
      id,
      selectedOption,
      selectedChecked,
      specs,
    });
  };
};

export const getDelivery = () => {
  return () => {
    fetch(
      "https://partner-api.stg-myteksi.com/grab-express-sandbox/v1/deliveries/quotes",

      {
        method: "POST",
        headers: {
          authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Il9kZWZhdWx0IiwidHlwIjoiSldUIn0.eyJhdWQiOiI3YWFkNGFkNDM5NDc0YWY5OThmNGU5Y2JiN2NkYjQzNiIsImV4cCI6MTYzMTg2NzIzNCwiaWF0IjoxNjMxNzgwODM0LCJpc3MiOiJodHRwczovL2lkcC5ncmFiLmNvbSIsImp0aSI6InN4dFAybWQ1VFVxV3hLajhMd0xDVFEiLCJuYmYiOjE2MzE3ODA2NTQsInBpZCI6ImQ5ZGIwNDM2LWFlZDctNDI0Ni04NmE5LWQyNmI0Njk3OWVlYyIsInBzdCI6MSwic2NwIjoiW1wiN2MxNDk3NGQzZDBlNDYyYjgzZDM1OGYwNTViZjdiYzZcIl0iLCJzdWIiOiJUV09fTEVHR0VEX09BVVRIIiwic3ZjIjoiIiwidGtfdHlwZSI6ImFjY2VzcyJ9.FhjC6cxTaMqWHba94oGWTS5kZobj1HDAZk8raNq8gJKOj7Wqa5yHUUTqFidMskPrcLoHTmvzyrkw0aDl3trrpCEFmej-9IS-5JueLKjHf_ECWB4i9AVkIgCF27rLMz3kNVpah6Dj_lVo-1JSVZyy_bfdy1ixt9PEibSPSAQt3T7Mzy-p2dYtBmOkL8KfsTKaNS8lsK-IlB6qjnfqC2XKxHSeFEQ-LA4eh2yA-9HWCJR3M5BvGB63Ch526vhFswhMk5fbsRb_deTXmnh55wwcYB8MLlJqkeRzmY2lQrp_s2v1TZE6IuWLLL2Y40dk_ImDpXeyr87Y-uCkcYTIG75cZQ",
          "content-type": "application/json",
        },
        body: {
          serviceType: "INSTANT",
          packages: [
            {
              name: "Drei ",
              description: "Fragile",
              quantity: 1,
              price: 10,
              dimensions: {
                height: 1,
                width: 1,
                depth: 1,
                weight: 1,
              },
            },
          ],
          origin: {
            address:
              "106 Perea, Legazpi Village, Makati,1229 Kalakhang Maynila",
            keywords:
              "106 Perea, Legazpi Village, Makati,1229 Kalakhang Maynila",
            ctyCode: "SIN",
            coordinates: {
              latitude: 14.5545827,
              longitude: 121.020837,
            },
          },
          destination: {
            address: "349 Mil Flores St, General Trias, Cavite, Philippines",
            keywords: "349 Mil Flores St, General Trias, Cavite, Philippines",
            cityCode: "SIN",
            coordinates: {
              latitude: 14.3082186,
              longitude: 120.900445,
            },
          },
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeCart = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };
};
