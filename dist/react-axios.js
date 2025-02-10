import { jsx as w } from "react/jsx-runtime";
import { createContext as y, useContext as A, useState as r, useMemo as C } from "react";
import E from "axios";
const v = y(void 0);
function H() {
  const t = A(v);
  if (!t) throw new Error("useAxiosInstance must be used within an AxiosProvider");
  return t;
}
function D({
  children: t,
  baseURL: n,
  withCredentials: s
}) {
  const [o, c] = r(), g = (i, e) => {
    c((u) => ({ ...u, [i]: e }));
  }, l = (i) => {
    c((e) => {
      const u = { ...e };
      return delete u[i], u;
    });
  }, f = C(() => E.create({
    baseURL: n,
    withCredentials: s,
    headers: o
  }), [n, s, o]);
  return /* @__PURE__ */ w(v.Provider, { value: { instance: f, addHeader: g, removeHeader: l }, children: t });
}
function x(t) {
  const { instance: n } = H(), [s, o] = r(!1), [c, g] = r(), [l, f] = r(0);
  return { data: c, isLoading: s, execute: async (e) => {
    var u, P;
    try {
      o(!0);
      const d = await n.request({
        url: t.path || (e == null ? void 0 : e.path),
        method: t.method,
        ...["get", "delete"].includes(t.method.toLowerCase()) && {
          params: e == null ? void 0 : e.data
        },
        ...["post", "put"].includes(t.method.toLowerCase()) && {
          data: e == null ? void 0 : e.data
        },
        ...(e == null ? void 0 : e.responseType) && { responseType: e.responseType },
        onUploadProgress: (h) => {
          if (h.total) {
            const L = Math.round(h.loaded * 100 / h.total);
            f(L), e != null && e.onProgress && e.onProgress(L);
          }
        }
      });
      return e != null && e.onSuccess && e.onSuccess(d.data), g(d.data), o(!1), d.data;
    } catch (d) {
      e != null && e.onError && e.onError(((P = (u = d.response) == null ? void 0 : u.data) == null ? void 0 : P.message) || d.message), o(!1);
      return;
    }
  }, progress: l };
}
function M(t) {
  const { data: n, execute: s, isLoading: o } = x({
    ...t,
    method: "get"
  });
  return { data: n, isLoading: o, execute: s };
}
function j(t) {
  const { data: n, execute: s, isLoading: o, progress: c } = x({
    ...t,
    method: "post"
  });
  return { data: n, isLoading: o, execute: s, progress: c };
}
function G(t) {
  const { data: n, execute: s, isLoading: o } = x({
    ...t,
    method: "put"
  });
  return { data: n, isLoading: o, execute: s };
}
function I(t) {
  const { data: n, execute: s, isLoading: o } = x({
    ...t,
    method: "delete"
  });
  return { data: n, isLoading: o, execute: s };
}
export {
  v as AxiosContext,
  D as AxiosProvider,
  H as useAxios,
  I as useDelete,
  M as useGet,
  j as usePost,
  G as usePut,
  x as useRequest
};
