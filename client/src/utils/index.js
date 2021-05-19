import Swal from "sweetalert2";

export const messageError = (title) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: title,
  });
};

export const errors = (title) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: title,
  });
};

export const messageSuccess = (title) => {
  Swal.fire({
    icon: "success",
    text: title,
  });
};

export const messageInfo = (mode, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
  });

  Toast.fire({
    icon: mode,
    title: title,
  });
};
