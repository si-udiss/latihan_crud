using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using MySql.Data;
using System.Data;

namespace crud
{
    class db
    {
        public static MySqlConnection koneksi = new MySqlConnection("server=localhost;username=root;password=;database=db_login_android;port=3307");
        public static MySqlDataAdapter da;
        public static MySqlCommand perintah;
        public static DataSet ds = new DataSet();

        public static void exec(string query)
        {
            Console.WriteLine(query);
            ds.Tables.Clear();
            perintah = new MySqlCommand(query, koneksi);
            da = new MySqlDataAdapter(perintah);
            da.Fill(ds);
        }
    }
}
