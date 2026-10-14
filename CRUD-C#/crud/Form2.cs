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
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
        }

        public string id = "";

        private void button2_Click(object sender, EventArgs e)
        {
            Form1 form1 = new Form1();
            form1.Show();
            form1.WindowState = FormWindowState.Maximized;
            this.Hide();
        }

        private void Form2_FormClosed(object sender, FormClosedEventArgs e)
        {
            Application.Exit();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if(textBox1.Text == "" || textBox3.Text == "" || richTextBox1.Text == "")
            {
                MessageBox.Show("Semua Wajib Diisi!");
                return;
            }

            if(id == "")
            {
                db.exec($"INSERT INTO pelanggan (nama_pelanggan, alamat, telepon) VALUES ('{textBox1.Text}', '{richTextBox1.Text}', '{textBox3.Text}')");
                MessageBox.Show("Data Berhasil Disimpan!");
            }
            else
            {
                db.exec($"UPDATE pelanggan SET nama_pelanggan = '{textBox1.Text}', alamat = '{richTextBox1.Text}', telepon = '{textBox3.Text}' WHERE id_pelanggan = '{id}'");
                MessageBox.Show("Data Berhasil Diubah!");
            }

            Form1 form1 = new Form1();
            form1.Show();
            form1.WindowState = FormWindowState.Maximized;
            this.Hide();
        }

        private void Form2_Load(object sender, EventArgs e)
        {

        }
    }
}
