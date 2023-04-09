<template>
  <div>
    <p>Notion blog</p>
  </div>
</template>

<script>
import { Client } from "@notionhq/client";
import axios from "axios";
export default {
  mounted() {
    // this.getNotions()
    this.getNotionsAxios();
  },
  methods: {
    async getNotions() {
      console.log("getNotions");
      const databaseId = "c21f8f5d58a0449bac320b30c1517286";
      const notion = new Client({
        auth: `secret_70BkY6ic69sdWQC8KbnsvIIxCwAV4wsZZEKz2icvoTJ`,
      });

      const listUsersResponse = await notion.users.list({});
      const response = await notion.databases.retrieve({
        database_id: databaseId,
      });

      console.log("responce", response);
      console.log("user", listUsersResponse);

      //     // CORS 対策
      //     const headers = {
      //       'Access-Control-Allow-Origin': 'http://localhost:8080', // 許可するオリジンを指定
      //       'Content-Type': 'application/json'
      //     };

      //     // リクエスト送信
      //     const requestOptions = {
      //       method: 'GET',
      //       headers: headers,
      //       mode: 'cors' // CORS 対策のために指定
      //     };

      //     fetch('https://api.notion.com/v1/users', requestOptions)
      //       .then(response => response.json())
      //       .then(data => console.log(data))
      //       .catch(error => console.error(error));
    },
    async getNotionsAxios() {
      // const id = 'c21f8f5d58a0449bac320b30c1517286'

      // エンジニアライフのブログページ
      const id = "7-d2d71dcd977a4598bed915f5f8ff9224";
      const token =
        "v02%3Auser_token_or_cookies%3AMVmYOiWKq_5G_4SdHKjREKi2HaawaZeKWqs0C4IBWEnQ7hyZsosHjCf9oq6wCDY1zQr694kDSQOHMl3elpkpFuzl6hyeD_3a85UZZe2aFZ2tj27IbeRz7VatRnRtAbAy98SV";

      const { data } = await axios
        .get(
          "https://notion-api.splitbee.io/v1/page/" + id,
          // 'https://api.notion.com/v1/users'+id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Notion-Version": "2021-08-16",
              "Content-Type": "application/json",
            },
          }
        )
        .catch((err) => {
          console.log(err);
        });
      console.log("data", data);
    },
  },
};
</script>
