using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using MySql.Data.MySqlClient;

namespace BejelentkezesApp
{
    public partial class EditOraWindow : Window
    {
        private readonly string connectionString = "server=localhost;database=ora;user=root;password=root;";
        private readonly int oraId;

        public EditOraWindow(int selectedOraId)
        {
            InitializeComponent();
            oraId = selectedOraId;
            LoadDropdowns();
            LoadData();
        }

        private void LoadDropdowns()
        {
            try
            {
                LoadComboBox("raktar", RaktarComboBox);
                LoadComboBox("marka", MarkaComboBox);
                LoadComboBox("nem", NemComboBox);
                LoadComboBox("meghajtas", MeghajtasComboBox);
                LoadComboBox("vizallosag", VizallosagComboBox);
                LoadComboBox("jotallas", JotallasComboBox);
                LoadComboBox("tipus", TipusComboBox);
                LoadComboBox("datumkijelzes", DatumKijelzesComboBox);
                LoadComboBox("extrafunkcio", ExtraFunkcioComboBox);
                LoadComboBox("atokszine", AtokSzineComboBox);
                LoadComboBox("aszamlapszine", AszamLapSzineComboBox);
                LoadComboBox("atok", AtokComboBox);
                LoadComboBox("kristalyuveg", KristalyUvegComboBox);
                LoadComboBox("szamlaptipus", SzamLapTipusComboBox);
                LoadComboBox("oraforma", OraFormaComboBox);
                LoadComboBox("szijszine", SzijSzineComboBox);
                LoadComboBox("szij", SzijComboBox);
                LoadComboBox("maxcsuklomili", MaxCsukloMiliComboBox);
                LoadComboBox("sulygrammban", SulyGrammbanComboBox);
                LoadComboBox("jotallas", JotallasComboBox);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a legördülő listák betöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void LoadComboBox(string tableName, ComboBox comboBox)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    string query = $"SELECT * FROM {tableName}";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    MySqlDataReader reader = command.ExecuteReader();

                    Dictionary<int, string> items = new Dictionary<int, string>();
                    while (reader.Read())
                    {
                        items.Add(Convert.ToInt32(reader[0]), reader[1].ToString());
                    }

                    comboBox.ItemsSource = items;
                    comboBox.DisplayMemberPath = "Value";
                    comboBox.SelectedValuePath = "Key";
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a(z) {tableName} legördülő lista betöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void LoadData()
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    string query = "SELECT * FROM ora WHERE oraaz = @oraaz";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@oraaz", oraId);

                    MySqlDataReader reader = command.ExecuteReader();
                    if (reader.Read())
                    {
                        MegnevezesTextBox.Text = reader["megnevezes"].ToString();
                        Kep1TextBox.Text = reader["kep1"].ToString();
                        Kep2TextBox.Text = reader["kep2"].ToString();
                        Kep3TextBox.Text = reader["kep3"].ToString();
                        RaktarComboBox.SelectedValue = reader["raktaraz"];
                        ArTextBox.Text = reader["ar"].ToString();
                        CikkszamTextBox.Text = reader["cikszam"].ToString();
                        MarkaComboBox.SelectedValue = reader["markaaz"];
                        NemComboBox.SelectedValue = reader["nemaz"];
                        MeghajtasComboBox.SelectedValue = reader["meghajtasaz"];
                        VizallosagComboBox.SelectedValue = reader["vizallosagaz"];
                        JotallasComboBox.SelectedValue = reader["jotallasaz"];
                        MeretMillimeterbenTextBox.Text= reader["meretmillimeterben"].ToString() ;
                        TipusComboBox.SelectedValue = reader["tipusaz"];
                        DatumKijelzesComboBox.SelectedValue = reader["datumkijelzesaz"];
                        ExtraFunkcioComboBox.SelectedValue = reader["extrafunkcioaz"];
                        AtokSzineComboBox.SelectedValue = reader["atokszineaz"];
                        AszamLapSzineComboBox.SelectedValue = reader["aszamlapszineaz"];
                        AtokComboBox.SelectedValue = reader["atokaz"];
                        KristalyUvegComboBox.SelectedValue = reader["kristalyuvegaz"];
                        SzamLapTipusComboBox.SelectedValue = reader["szamlaptipusaz"];
                        OraFormaComboBox.SelectedValue = reader["oraformaaz"];
                        SzijSzineComboBox.SelectedValue = reader["szijszineaz"];
                        SzijComboBox.SelectedValue = reader["szijaz"];
                        MaxCsukloMiliComboBox.SelectedValue = reader["maxcsuklomiliaz"];
                        SulyGrammbanComboBox.SelectedValue = reader["sulygrammbanaz"];
                        DbTextBox.Text = reader["db"].ToString();
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba az adatok betöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    string query = @"
                        UPDATE ora SET
                            megnevezes = @megnevezes,
                            kep1 = @kep1,
                            kep2 = @kep2,
                            kep3 = @kep3,
                            raktaraz = @raktaraz,
                            ar = @ar,
                            cikszam = @cikszam,
                            markaaz = @markaaz,
                            nemaz = @nemaz,
                            meghajtasaz = @meghajtasaz,
                            vizallosagaz = @vizallosagaz,
                            jotallasaz= @jotallasaz,
                            meretmillimeterben= @meretmillimeterben,
                            tipusaz = @tipusaz,
                            datumkijelzesaz = @datumkijelzesaz,
                            extrafunkcioaz = @extrafunkcioaz,
                            atokszineaz = @atokszineaz,
                            aszamlapszineaz = @aszamlapszineaz,
                            atokaz = @atokaz,
                            kristalyuvegaz = @kristalyuvegaz,
                            szamlaptipusaz = @szamlaptipusaz,
                            oraformaaz = @oraformaaz,
                            szijszineaz = @szijszineaz,
                            szijaz = @szijaz,
                            maxcsuklomiliaz = @maxcsuklomiliaz,
                            sulygrammbanaz = @sulygrammbanaz,
                            db = @db
                        WHERE oraaz = @oraaz";

                    MySqlCommand command = new MySqlCommand(query, connection);

                    command.Parameters.AddWithValue("@megnevezes", MegnevezesTextBox.Text);
                    command.Parameters.AddWithValue("@kep1", Kep1TextBox.Text);
                    command.Parameters.AddWithValue("@kep2", Kep2TextBox.Text);
                    command.Parameters.AddWithValue("@kep3", Kep3TextBox.Text);
                    command.Parameters.AddWithValue("@raktaraz", RaktarComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@ar", ArTextBox.Text);
                    command.Parameters.AddWithValue("@cikszam", CikkszamTextBox.Text);
                    command.Parameters.AddWithValue("@markaaz", MarkaComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@nemaz", NemComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@meghajtasaz", MeghajtasComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@vizallosagaz", VizallosagComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@jotallasaz", JotallasComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@meretmillimeterben", string.IsNullOrEmpty(MeretMillimeterbenTextBox.Text) ? (object)DBNull.Value : MeretMillimeterbenTextBox.Text);
                    command.Parameters.AddWithValue("@tipusaz", TipusComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@datumkijelzesaz", DatumKijelzesComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@extrafunkcioaz", ExtraFunkcioComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@atokszineaz", AtokSzineComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@aszamlapszineaz", AszamLapSzineComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@atokaz", AtokComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@kristalyuvegaz", KristalyUvegComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@szamlaptipusaz", SzamLapTipusComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@oraformaaz", OraFormaComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@szijszineaz", SzijSzineComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@szijaz", SzijComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@maxcsuklomiliaz", MaxCsukloMiliComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@sulygrammbanaz", SulyGrammbanComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@db", DbTextBox.Text);
                    command.Parameters.AddWithValue("@oraaz", oraId);

                    command.ExecuteNonQuery();
                }

                MessageBox.Show("Módosítások sikeresen mentve!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a mentés során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("A művelet megszakítva.", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
            Close();
        }
    }
}
