import { jsx as L } from "react/jsx-runtime";
import { createContext as v, useContext as p, useState as a, useMemo as w } from "react";
import y from "axios";
const P = v(void 0);
function A() {
  const e = p(P);
  if (!e) throw new Error("useAxiosInstance must be used within an AxiosProvider");
  return e;
}
function S({
  children: e,
  baseURL: s,
  withCredentials: n
}) {
  const [o, u] = a(), x = (d, t) => {
    u((r) => ({ ...r, [d]: t }));
  }, g = (d) => {
    u((t) => {
      const r = { ...t };
      return delete r[d], r;
    });
  }, l = w(() => y.create({
    baseURL: s,
    withCredentials: n,
    headers: o
  }), [s, n, o]);
  return /* @__PURE__ */ L(P.Provider, { value: { instance: l, addHeader: x, removeHeader: g }, children: e });
}
function i(e) {
  const { instance: s } = A(), [n, o] = a(!1), [u, x] = a(), [g, l] = a(0);
  return { data: u, isLoading: n, execute: async (t) => {
    var r, h;
    try {
      o(!0);
      const c = await s.request({
        url: e.path || t.path,
        method: e.method,
        ...["get", "delete"].includes(e.method.toLowerCase()) && {
          params: t.data
        },
        ...["post", "put"].includes(e.method.toLowerCase()) && {
          data: t.data
        },
        ...t.responseType && { responseType: t.responseType },
        onUploadProgress: (f) => {
          if (f.total) {
            const m = Math.round(f.loaded * 100 / f.total);
            l(m), t.onProgress && t.onProgress(m);
          }
        }
      });
      return t.onSuccess && t.onSuccess(c.data), x(c.data), o(!1), c.data;
    } catch (c) {
      t.onError && t.onError(((h = (r = c.response) == null ? void 0 : r.data) == null ? void 0 : h.message) || c.message), o(!1);
      return;
    }
  }, progress: g };
}
function T(e) {
  const { data: s, execute: n, isLoading: o } = i({
    ...e,
    method: "get"
  });
  return { data: s, isLoading: o, execute: n };
}
function q(e) {
  const { data: s, execute: n, isLoading: o, progress: u } = i({
    ...e,
    method: "post"
  });
  return { data: s, isLoading: o, execute: n, progress: u };
}
function D(e) {
  const { data: s, execute: n, isLoading: o } = i({
    ...e,
    method: "put"
  });
  return { data: s, isLoading: o, execute: n };
}
function M(e) {
  const { data: s, execute: n, isLoading: o } = i({
    ...e,
    method: "delete"
  });
  return { data: s, isLoading: o, execute: n };
}
export {
  P as AxiosContext,
  S as AxiosProvider,
  A as useAxios,
  M as useDelete,
  T as useGet,
  q as usePost,
  D as usePut,
  i as useRequest
};
