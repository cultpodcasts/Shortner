import { expect, test } from 'vitest'
import { base64ToGuid } from '../src/guid-service'

test('test-case-known-broken-1', () => {
  expect(base64ToGuid("YD-g-mol10u4ch6jCVu5hQ")).toBe("fee03f60-256a-4bd7-b872-1ea3095bb985")
})


test('test-case-1', () => {
    expect(base64ToGuid("7KbRT4k9E0W6n4DH2XX-Ew")).toBe("4fd1a6ec-3d89-4513-ba9f-80c7d975ff13")
  })
  
  
  test('test-case-2', () => {
    expect(base64ToGuid("-9jP7MzdLUSakBnTXmM7IA")).toBe("eccfd8ff-ddcc-442d-9a90-19d35e633b20")
  })
  
  
  test('test-case-3', () => {
    expect(base64ToGuid("sdjUQjzgykyp92ZkY9MI4Q")).toBe("42d4d8b1-e03c-4cca-a9f7-666463d308e1")
  })
  
  
  test('test-case-4', () => {
    expect(base64ToGuid("3pnPxWq0LUe8hzpLqvxPEw")).toBe("c5cf99de-b46a-472d-bc87-3a4baafc4f13")
  })
  
  
  test('test-case-5', () => {
    expect(base64ToGuid("Rlv5jWhOOUSILDhBnXqmUQ")).toBe("8df95b46-4e68-4439-882c-38419d7aa651")
  })
  
  
  test('test-case-6', () => {
    expect(base64ToGuid("i-B1eBTVJUe-LV8H5yMmxg")).toBe("7875f08b-d514-4725-bf2d-5f07e72326c6")
  })
  
  
  test('test-case-7', () => {
    expect(base64ToGuid("388obUyK5Eml-1_4TNpt4g")).toBe("6d28cfdf-8a4c-49e4-a5ff-5fb84cda6de2")
  })
  
  
  test('test-case-8', () => {
    expect(base64ToGuid("DV8os9o52E6wyRKGVS9XAg")).toBe("b3285f0d-39da-4ed8-b0c9-1286552f5702")
  })
  
  
  test('test-case-9', () => {
    expect(base64ToGuid("53LSomaenE6G32v_wG5odQ")).toBe("a2d272e7-9e66-4e9c-86df-6bfec06e6875")
  })
  
  
  test('test-case-10', () => {
    expect(base64ToGuid("XQKggrSBmUWEoIFLCDrMSQ")).toBe("82a0025d-81b4-4599-84a0-814b083acc49")
  })
  
  
  test('test-case-11', () => {
    expect(base64ToGuid("x6YkTolIxUid5YDu55PknA")).toBe("4e24a6c7-4889-48c5-9de5-80eee793e49c")
  })
  
  
  test('test-case-12', () => {
    expect(base64ToGuid("mZmjMAPiME67V4-qF_0uTg")).toBe("30a39999-e203-4e30-bb57-8fea17ed2e4e")
  })
  
  
  test('test-case-13', () => {
    expect(base64ToGuid("_3nlOdHwAk_0kC6DhuiBcA")).toBe("39e579fb-f0d1-4f02-b490-2e8386e88170")
  })
  
  
  test('test-case-14', () => {
    expect(base64ToGuid("iLyjKJHukEGXxx3-a9v_lA")).toBe("28a3bc88-ee91-4190-97c7-1dff6bdbfe94")
  })
  
  
  test('test-case-15', () => {
    expect(base64ToGuid("DmPUpdw5SUmbseENqKZDJQ")).toBe("a5d4630e-39dc-4949-9bb1-e10da8a64325")
  })
  
  
  test('test-case-16', () => {
    expect(base64ToGuid("uBQmWGikbEqUYdZmWwvYNg")).toBe("582614b8-a468-4a6c-9461-d6665b0bd836")
  })
  
  
  test('test-case-17', () => {
    expect(base64ToGuid("woXU-X8ZnkWRalwgrK05Ag")).toBe("fdd485c2-197f-459e-916a-5c20acad3902")
  })
  
  
  test('test-case-18', () => {
    expect(base64ToGuid("r2t0_m4RdUKJyM7RBPTOfw")).toBe("fa746baf-116e-4275-89c8-ced104f4ce7f")
  })
  
  
  test('test-case-19', () => {
    expect(base64ToGuid("pb7xBBAzCEWjoJRe2w3LzQ")).toBe("04f1bea5-3310-4508-a3a0-945edb0dcbcd")
  })
  
  
  test('test-case-20', () => {
    expect(base64ToGuid("__wwUJy8Q02iXdD0obNwEw")).toBe("5030ecfb-bc9c-4d43-a25d-d0f4a1b37013")
  })
  
  
  test('test-case-21', () => {
    expect(base64ToGuid("TZYVfgqU50yB6b-AHruaEg")).toBe("7e15964d-940a-4ce7-81e9-bfc01ebb9a12")
  })
  
  
  test('test-case-22', () => {
    expect(base64ToGuid("a1RDjmKZVEmO80KK0oNdvQ")).toBe("8e43546b-9962-4954-8ef3-428ad2835dbd")
  })
  
  
  test('test-case-23', () => {
    expect(base64ToGuid("nekidCfzKEGFl_3iMLa94g")).toBe("7422e99d-f327-4128-8597-ede230b6bde2")
  })
  
  
  test('test-case-24', () => {
    expect(base64ToGuid("SQ7AkY7GJkqzxtPTIf8HDw")).toBe("91c00e49-c68e-4a26-b3c6-d3d321ff070f")
  })
  
  
  test('test-case-25', () => {
    expect(base64ToGuid("A5pm2fg9REWzsxQpGL_9yA")).toBe("d9669a03-3df8-4544-b3b3-142918bfbdc8")
  })
  
  
  test('test-case-26', () => {
    expect(base64ToGuid("4cmwC2lPvkuQyAcLsKOL7Q")).toBe("0bb0c9e1-4f69-4bbe-90c8-070bb0a38bed")
  })
  
  
  test('test-case-27', () => {
    expect(base64ToGuid("Q1_BI2uOG0auVMtE_4la_A")).toBe("23815f43-8e6b-461b-ae54-cb44fb895af8")
  })
  
  
  test('test-case-28', () => {
    expect(base64ToGuid("MgSjkYZe-UmaMYFF0yualQ")).toBe("91a30432-5e86-49fd-9a31-8145d32b9a95")
  })
  
  
  test('test-case-29', () => {
    expect(base64ToGuid("-F_qby-HCkqV1g8NsuK-Bw")).toBe("6faa5ffc-c72f-4a0a-95d6-0f0db2e2bf07")
  })
  
  
  test('test-case-30', () => {
    expect(base64ToGuid("GXaHAhWBaUes2FtbmkeDYA")).toBe("02877619-8115-4769-acd8-5b5b9a478360")
  })
  
  
  test('test-case-31', () => {
    expect(base64ToGuid("bD4oH_tRKEudd_Dm1B4edw")).toBe("1f283e6c-51eb-4b28-9d77-e0e6d41e1e77")
  })
  
  
  test('test-case-32', () => {
    expect(base64ToGuid("B0cnNAVpz0qXQ5Shr_aM9w")).toBe("34274707-6905-4acf-9743-94a1afe68cf7")
  })
  
  
  test('test-case-33', () => {
    expect(base64ToGuid("xyXwwSa7r0Wh2au8Gr28Lw")).toBe("c1f025c7-bb26-45af-a1d9-abbc1abdbc2f")
  })
  
  
  test('test-case-34', () => {
    expect(base64ToGuid("oU2WOIk8lkG4g5orNWRGvw")).toBe("38964da1-3c89-4196-b883-9a2b356446bf")
  })
  
  
  test('test-case-35', () => {
    expect(base64ToGuid("ILyaHv3HkUaaACOxkvQvpg")).toBe("1e9abc20-c7fd-4691-9a00-23b192f42fa6")
  })
  
  
  test('test-case-36', () => {
    expect(base64ToGuid("IC1pU2oq6k6FYM0rCK_39w")).toBe("53692d20-2a6a-4eea-8560-cd2b08afb7f7")
  })
  
  
  test('test-case-37', () => {
    expect(base64ToGuid("A6K9RV7dz02SQvsUjZ2qxg")).toBe("45bda203-dd5e-4dcf-9242-fb148d9daac6")
  })
  
  
  test('test-case-38', () => {
    expect(base64ToGuid("Zbk4AYe1O06ooNYFoQTIRA")).toBe("0138b965-b587-4e3b-a8a0-d605a104c844")
  })
  
  
  test('test-case-39', () => {
    expect(base64ToGuid("Jm6ARXiuWU23MiDH1Inqlw")).toBe("45806e26-ae78-4d59-b732-20c7d489ea97")
  })
  
  
  test('test-case-40', () => {
    expect(base64ToGuid("1D9LIvgp0kCSzVOeXemqUg")).toBe("224b3fd4-29f8-40d2-92cd-539e5de9aa52")
  })
  
  
  test('test-case-41', () => {
    expect(base64ToGuid("31ax9YLZKEWcekFoPyLLKw")).toBe("f5b156df-d982-4528-9c7a-41683f22cb2b")
  })
  
  
  test('test-case-42', () => {
    expect(base64ToGuid("qejupMENz02C50tYyFqkIg")).toBe("a4eee8a9-0dc1-4dcf-82e7-4b58c85aa422")
  })
  
  
  test('test-case-43', () => {
    expect(base64ToGuid("t2E5mlqdWkqR0Q6QgbXtWg")).toBe("9a3961b7-9d5a-4a5a-91d1-0e9081b5ed5a")
  })
  
  
  test('test-case-44', () => {
    expect(base64ToGuid("aJRmKMTJykGGMYKcMbSHsg")).toBe("28669468-c9c4-41ca-8631-829c31b487b2")
  })
  
  
  test('test-case-45', () => {
    expect(base64ToGuid("756ETMV_eUaDWLquEW_dHw")).toBe("4c849eef-7ec5-4679-8358-baae116f9d1f")
  })
  
  
  test('test-case-46', () => {
    expect(base64ToGuid("AkYl07wIjUeqJ6dKKkbQ9A")).toBe("d3254602-08bc-478d-aa27-a74a2a46d0f4")
  })
  
  
  test('test-case-47', () => {
    expect(base64ToGuid("zk2XA9Axvk2t77_uclmWNw")).toBe("03974dce-31d0-4dbe-adef-bfae72599637")
  })
  
  
  test('test-case-48', () => {
    expect(base64ToGuid("fRcsAHJLaEmLBd8aJrzOSQ")).toBe("002c177d-4b72-4968-8b05-df1a26bcce49")
  })
  
  
  test('test-case-49', () => {
    expect(base64ToGuid("XYUAzBThgEedhLg7I2GZ-Q")).toBe("cc00855d-e114-4780-9d84-b83b236199fd")
  })
  
  
  test('test-case-50', () => {
    expect(base64ToGuid("FORKeWjoWUWKirKqdkgDoA")).toBe("794ae414-e868-4559-8a8a-b2aa764803a0")
  })
  
  
  test('test-case-51', () => {
    expect(base64ToGuid("avot04Fua0263w2HFJrhKw")).toBe("d32dfa6a-6e81-4d6b-badf-0d87149ae12b")
  })
  
  
  test('test-case-52', () => {
    expect(base64ToGuid("xiQr2WmsuUekVZPG2TEi_g")).toBe("d92b24c6-ac69-47b9-a455-93c6d93122fa")
  })
  
  
  test('test-case-53', () => {
    expect(base64ToGuid("Y5DObC0wQkm80mii6BuEIg")).toBe("6cce9063-302d-4942-bcd2-68a2e81b8422")
  })
  
  
  test('test-case-54', () => {
    expect(base64ToGuid("GE24RhJpbkCdB6UFUciaTw")).toBe("46b84d18-6912-406e-9d07-a50551c89a4f")
  })
  
  
  test('test-case-55', () => {
    expect(base64ToGuid("7TJaj9O8ekCKVUlousBX4g")).toBe("8f5a32ed-bcd3-407a-8a55-4968bac057e2")
  })
  
  
  test('test-case-56', () => {
    expect(base64ToGuid("HxFb7jfoh0qjiIMmKbBQjg")).toBe("ee5b111f-e837-4a87-a388-832629b0508e")
  })
  
  
  test('test-case-57', () => {
    expect(base64ToGuid("lqsAAnhxokOH5JJUGQDbNw")).toBe("0200ab96-7178-43a2-87e4-92541900db37")
  })
  
  
  test('test-case-58', () => {
    expect(base64ToGuid("9TrqS4-Vykmquvu1fC6WKQ")).toBe("4bea3af5-d58f-49ca-aaba-fbb57c2e9629")
  })
  
  
  test('test-case-59', () => {
    expect(base64ToGuid("JvtFci2ciEyZt4PTzN3Yzg")).toBe("7245fb26-9c2d-4c88-99b7-83d3ccddd8ce")
  })
  
  
  test('test-case-60', () => {
    expect(base64ToGuid("u1bmoosqnkCTCbtTr9YXVA")).toBe("a2e656bb-2a8b-409e-9309-bb53afd61754")
  })
  
  
  test('test-case-61', () => {
    expect(base64ToGuid("pwcaAWGOKk2WGXGBQ3P1_A")).toBe("011a07a7-8e61-4d2a-9619-71814373f5f8")
  })
  
  
  test('test-case-62', () => {
    expect(base64ToGuid("9wDeLthGiEapNmNPLUuAWw")).toBe("2ede00f7-46d8-4688-a936-634f2d4b805b")
  })
  
  
  test('test-case-63', () => {
    expect(base64ToGuid("YK-2vV755UKIQ0DGL_cQLA")).toBe("bdf6af60-f95e-42e5-8843-40c62fe7102c")
  })
  
  
  test('test-case-64', () => {
    expect(base64ToGuid("Ka7fRUih3U_5jKjtTrg9kA")).toBe("45dfae29-a148-4fdd-b98c-a8ed4eb83d90")
  })
  
  
  test('test-case-65', () => {
    expect(base64ToGuid("UuJW1erk60aOJ9ohj1WXuw")).toBe("d556e252-e4ea-46eb-8e27-da218f5597bb")
  })
  
  
  test('test-case-66', () => {
    expect(base64ToGuid("dz4mbqYC-0quZxw9EoDrTQ")).toBe("6e263e77-02a6-4aff-ae67-1c3d1280eb4d")
  })
  
  
  test('test-case-67', () => {
    expect(base64ToGuid("4nRoz8NKUUu9yZy7Fa3mVQ")).toBe("cf6874e2-4ac3-4b51-bdc9-9cbb15ade655")
  })
  
  
  test('test-case-68', () => {
    expect(base64ToGuid("fpi7I_Sl4kWScjhNflYeqw")).toBe("23bb987e-a5e4-45e2-9272-384d7e561eab")
  })
  
  
  test('test-case-69', () => {
    expect(base64ToGuid("LPvIztxOekm5vhHOzXHc_w")).toBe("cec8fb2c-4edc-497a-b9be-11cecd71dcfb")
  })
  
  
  test('test-case-70', () => {
    expect(base64ToGuid("4Df-kC6QDUuMr6xzajhQMA")).toBe("90ff37e0-902e-4b0d-8caf-ac736a385030")
  })
  
  
  test('test-case-71', () => {
    expect(base64ToGuid("dOw0lwS41kaxPJUlZs-aEQ")).toBe("9734ec74-b804-46d6-b13c-952566cfda11")
  })
  
  
  test('test-case-72', () => {
    expect(base64ToGuid("Hs0WeIGQY0WMIxUa0Im7ag")).toBe("7816cd1e-9081-4563-8c23-151ad089bb6a")
  })
  
  
  test('test-case-73', () => {
    expect(base64ToGuid("1Lt9U7yfU0WRT2emCVxt4w")).toBe("537dbbd4-9fbc-4553-914f-67a6095c6de3")
  })
  
  
  test('test-case-74', () => {
    expect(base64ToGuid("l9M_N4EWokujkynF4fY-yg")).toBe("373ed397-1681-4ba2-a393-29c5e1f63fca")
  })
  
  
  test('test-case-75', () => {
    expect(base64ToGuid("-otVduGhTESQcU4SjMSgyw")).toBe("76558bfe-a1e1-444c-9071-4e128cc4a0cb")
  })
  
  
  test('test-case-76', () => {
    expect(base64ToGuid("3LAkrFlIKkmdwR6x5aHHbw")).toBe("ac24b0dc-4859-492a-9dc1-1eb1e5a1c76f")
  })
  
  
  test('test-case-77', () => {
    expect(base64ToGuid("10Sv8SmkbEabDSFHvXTyVg")).toBe("f1af44d7-a429-466c-9b0d-2147bd74f256")
  })
  
  
  test('test-case-78', () => {
    expect(base64ToGuid("-L2gV0KJBUa_ZDISNkWSrw")).toBe("57a0bdfc-8942-4605-be64-3212364592af")
  })
  
  
  test('test-case-79', () => {
    expect(base64ToGuid("sDEELvPpeEef_XHbHqkeEQ")).toBe("2e0431b0-e9f3-4778-9ff9-71db1ea91e11")
  })
  
  
  test('test-case-80', () => {
    expect(base64ToGuid("iAfr-8BIA0qfAn9sp4ymOQ")).toBe("ffeb0788-48c0-4a03-9f02-7f6ca78ca639")
  })
  
  
  test('test-case-81', () => {
    expect(base64ToGuid("RR35gwby2U6ltDY2qBhxmQ")).toBe("83f91d45-f206-4ed9-a5b4-3636a8187199")
  })
  
  
  test('test-case-82', () => {
    expect(base64ToGuid("9X9AS-Qk9US4-9X87GuZbw")).toBe("4b407ff5-24f4-44f5-b8ff-d5fcec6b996f")
  })
  
  
  test('test-case-83', () => {
    expect(base64ToGuid("vzPmJT4ckUGOzd2QhEs52A")).toBe("25e633bf-1c3e-4191-8ecd-dd90844b39d8")
  })
  
  
  test('test-case-84', () => {
    expect(base64ToGuid("fVGbSr0bOUG0uGCs5sVepA")).toBe("4a9b517d-1bbd-4139-b4b8-60ace6c55ea4")
  })
  
  
  test('test-case-85', () => {
    expect(base64ToGuid("Vsr9wpf8eUKRGpHhlARF_Q")).toBe("c2fdca56-fc97-4279-911a-91e1940445f9")
  })
  
  
  test('test-case-86', () => {
    expect(base64ToGuid("Tz6YJtva2kmeBs6CcHKwsw")).toBe("26983e4f-dadb-49da-9e06-ce827072b0b3")
  })
  
  
  test('test-case-87', () => {
    expect(base64ToGuid("eldNrYcCTkOMTVSjcCiZPg")).toBe("ad4d577a-0287-434e-8c4d-54a37028993e")
  })
  
  
  test('test-case-88', () => {
    expect(base64ToGuid("yoqan7q2_0mWGntbuC9kgg")).toBe("9f9a8aca-b6ba-49fb-961a-7b5bb82f6482")
  })
  
  
  test('test-case-89', () => {
    expect(base64ToGuid("bcBJ7f6aUkubHGqEz9-qGw")).toBe("ed49c06d-9afe-4b52-9b1c-6a84cfdfea1b")
  })
  
  
  test('test-case-90', () => {
    expect(base64ToGuid("mqeKPfeX60eqdSMId3XTAQ")).toBe("3d8aa79a-97f7-47eb-aa75-23087775d301")
  })
  
  
  test('test-case-91', () => {
    expect(base64ToGuid("Rqj_mqladEa_p3QQpUtXvQ")).toBe("9afea846-5aa9-4674-bea7-7410a54b57bd")
  })
  
  
  test('test-case-92', () => {
    expect(base64ToGuid("rkgt4hAxLU27ccq_d9Z68A")).toBe("e22d48ae-3110-4d2d-bb71-cabe77d67af0")
  })
  
  
  test('test-case-93', () => {
    expect(base64ToGuid("xpfD-ADRjESwsbnOB_T2cg")).toBe("fcc397c6-d100-448c-b0b1-b9ce07e4f672")
  })
  
  
  test('test-case-94', () => {
    expect(base64ToGuid("BzUDZVJZbUeESVjuUTouaQ")).toBe("65033507-5952-476d-8449-58ee513a2e69")
  })
  
  
  test('test-case-95', () => {
    expect(base64ToGuid("-20_9-0qO0Kvcd-U6km0gA")).toBe("f73e6dff-2afd-423b-af71-dfd4ea49b480")
  })
  
  
  test('test-case-96', () => {
    expect(base64ToGuid("ZmTatlBz40OxbbL7Y_sU_Q")).toBe("b6da6466-7350-43e3-b16d-b2fb63eb14f9")
  })
  
  
  test('test-case-97', () => {
    expect(base64ToGuid("8W_R05xGdk2oISRpnkDxRA")).toBe("d3916ff1-469c-4d76-a821-24699e40f144")
  })
  
  
  test('test-case-98', () => {
    expect(base64ToGuid("Dxcg5Ly4KUOGk0iWqiBbIQ")).toBe("e420170f-b8bc-4329-8693-4896aa205b21")
  })
  
  
  test('test-case-99', () => {
    expect(base64ToGuid("GLtEVHHLoEmFpQY61oTVbw")).toBe("5444bb18-cb71-49a0-85a5-063ad684d56f")
  })
  
  
  test('test-case-100', () => {
    expect(base64ToGuid("nUOUcvbLBk6LVFMiwEQ5qg")).toBe("7294439d-cbf6-4e06-8b54-5322c04439aa")
  })