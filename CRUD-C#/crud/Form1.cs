using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace crud
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public void tampil(string keyword)
        {
            dataGridView1.Rows.Clear();
            db.exec($"SELECT * FROM pelanggan WHERE nama_pelanggan LIKE '%{keyword}%'");
            foreach (DataRow baris in db.ds.Tables[0].Rows)
            {
                dataGridView1.Rows.Add(baris["id_pelanggan"], baris["nama_pelanggan"], baris["alamat"], baris["telepon"]);
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            tampil("");
        }

        private void button1_Click(object sender, EventArgs e)
        {
            Form2 form2 = new Form2();
            form2.Show();
            form2.WindowState = FormWindowState.Maximized;
            this.Hide();
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            tampil(textBox1.Text);
        }

        private void Form1_FormClosed(object sender, FormClosedEventArgs e)
        {
            Application.Exit();
        }

        private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            int idxrow = e.RowIndex;
            int idxcolumn = e.ColumnIndex;

            if(idxcolumn == 4)
            {
                Form2 form2 = new Form2();
                form2.Show();
                form2.id = dataGridView1.Rows[idxrow].Cells[0].Value.ToString();
                form2.button1.BackColor = Color.FromArgb(0, 192, 0);
                form2.button1.Text = "Ubah";
                db.exec($"SELECT * FROM pelanggan WHERE id_pelanggan = '{form2.id}'");
                int rowCount = db.ds.Tables[0].Rows.Count;
                if (rowCount != 1)
                {
                    MessageBox.Show("Data Gagal Ditemukan!");
                    return;
                }

                DataRow row = db.ds.Tables[0].Rows[0];
                form2.textBox1.Text = row["nama_pelanggan"].ToString();
                form2.richTextBox1.Text = row["alamat"].ToString();
                form2.textBox3.Text = row["telepon"].ToString();
                form2.WindowState = FormWindowState.Maximized;
                this.Hide();
            }
            else if (idxcolumn == 5)
            {
                string id = dataGridView1.Rows[idxrow].Cells[0].Value.ToString();
                db.exec($"DELETE FROM pelanggan WHERE id_pelanggan = '{id}'");
                MessageBox.Show("Data Berhasil Dihapus!");
                tampil("");
            }
        }
    }
}
