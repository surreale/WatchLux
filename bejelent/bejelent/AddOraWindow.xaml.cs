using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using MySql.Data.MySqlClient;

namespace BejelentkezesApp
{
    public partial class AddOraWindow : Window
    {
        private readonly string connectionString = "server=localhost;database=ora;user=root;password=root;";

        public Action OnOraAdded { get; set; } 

        public AddOraWindow()
        {
            InitializeComponent();
            LoadDropdowns();
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

                    string primaryKeyQuery = $@"
                        SELECT COLUMN_NAME
                        FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                        WHERE TABLE_NAME = '{tableName}' 
                        AND TABLE_SCHEMA = DATABASE()
                        AND CONSTRAINT_NAME = 'PRIMARY'";

                    MySqlCommand primaryKeyCommand = new MySqlCommand(primaryKeyQuery, connection);
                    string primaryKeyColumn = primaryKeyCommand.ExecuteScalar()?.ToString();

                    if (string.IsNullOrEmpty(primaryKeyColumn))
                        throw new Exception($"A(z) {tableName} táblában nincs elsődleges kulcs!");

                    string displayColumnQuery = $@"
                        SELECT COLUMN_NAME
                        FROM INFORMATION_SCHEMA.COLUMNS
                        WHERE TABLE_NAME = '{tableName}'
                        AND TABLE_SCHEMA = DATABASE()
                        AND COLUMN_NAME NOT IN ('{primaryKeyColumn}')
                        LIMIT 1";

                    MySqlCommand displayColumnCommand = new MySqlCommand(displayColumnQuery, connection);
                    string displayColumn = displayColumnCommand.ExecuteScalar()?.ToString();

                    if (string.IsNullOrEmpty(displayColumn))
                        throw new Exception($"A(z) {tableName} táblában nincs megjeleníthető oszlop!");

                    string query = $"SELECT {primaryKeyColumn}, {displayColumn} FROM {tableName}";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    MySqlDataReader reader = command.ExecuteReader();

                    Dictionary<int, string> items = new Dictionary<int, string>();
                    while (reader.Read())
                    {
                        items.Add(reader.GetInt32(0), reader[1].ToString());
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

        private bool ValidateInputs()
        {
            if (string.IsNullOrWhiteSpace(MegnevezesTextBox.Text))
            {
                MessageBox.Show("A megnevezés mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (RaktarComboBox.SelectedValue == null)
            {
                MessageBox.Show("A raktár mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (MarkaComboBox.SelectedValue == null)
            {
                MessageBox.Show("A márka mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (NemComboBox.SelectedValue == null)
            {
                MessageBox.Show("A nem mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (MeghajtasComboBox.SelectedValue == null)
            {
                MessageBox.Show("A meghajtás mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (VizallosagComboBox.SelectedValue == null)
            {
                MessageBox.Show("A vízállóság mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (TipusComboBox.SelectedValue == null)
            {
                MessageBox.Show("A típus mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (DatumKijelzesComboBox.SelectedValue == null)
            {
                MessageBox.Show("A dátumkijelzés mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (ExtraFunkcioComboBox.SelectedValue == null)
            {
                MessageBox.Show("Az extrafunkció mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (AtokSzineComboBox.SelectedValue == null)
            {
                MessageBox.Show("Az atok színe mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (AszamLapSzineComboBox.SelectedValue == null)
            {
                MessageBox.Show("Az számlap színe mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (AtokComboBox.SelectedValue == null)
            {
                MessageBox.Show("Az atok mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (KristalyUvegComboBox.SelectedValue == null)
            {
                MessageBox.Show("A kristályüveg mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (SzamLapTipusComboBox.SelectedValue == null)
            {
                MessageBox.Show("A számlap típusa mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (OraFormaComboBox.SelectedValue == null)
            {
                MessageBox.Show("Az óraformája mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (SzijSzineComboBox.SelectedValue == null)
            {
                MessageBox.Show("A szíj színe mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (SzijComboBox.SelectedValue == null)
            {
                MessageBox.Show("A szíj mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (MaxCsukloMiliComboBox.SelectedValue == null)
            {
                MessageBox.Show("A max csukló méret mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (SulyGrammbanComboBox.SelectedValue == null)
            {
                MessageBox.Show("A súly grammban mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            if (JotallasComboBox.SelectedValue == null)
            {
                MessageBox.Show("A jótállás mező nem lehet üres!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }
            return true;
        }

        private bool ValidateNumericInputs()
        {
            
            if (!int.TryParse(DbTextBox.Text, out _))
            {
                MessageBox.Show("A darabszám mezőbe csak egész szám írható!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            
            if (!decimal.TryParse(ArTextBox.Text, out _))
            {
                MessageBox.Show("Az ár mezőbe csak szám írható!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            return true;
        }

        private void SaveOraButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                
                if (!ValidateInputs())
                {
                    return; 
                }

                
                if (!ValidateNumericInputs())
                {
                    return; 
                }

                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    string query = @"
                    INSERT INTO ora (
                        megnevezes, kep1, kep2, kep3, raktaraz, ar, cikszam, markaaz, nemaz, meghajtasaz,
                        vizallosagaz, jotallasaz, meretmillimeterben, sulygrammbanaz, tipusaz, datumkijelzesaz,
                        extrafunkcioaz, atokszineaz, aszamlapszineaz, atokaz, kristalyuvegaz, szamlaptipusaz,
                        oraformaaz, szijszineaz, szijaz, maxcsuklomiliaz, db
                    ) VALUES (
                        @megnevezes, @kep1, @kep2, @kep3, @raktaraz, @ar, @cikszam, @markaaz, @nemaz, @meghajtasaz,
                        @vizallosagaz, @jotallasaz, @meretmillimeterben, @sulygrammbanaz, @tipusaz, @datumkijelzesaz,
                        @extrafunkcioaz, @atokszineaz, @aszamlapszineaz, @atokaz, @kristalyuvegaz, @szamlaptipusaz,
                        @oraformaaz, @szijszineaz, @szijaz, @maxcsuklomiliaz, @db)";

                    MySqlCommand command = new MySqlCommand(query, connection);

                    
                    command.Parameters.AddWithValue("@megnevezes", MegnevezesTextBox.Text ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@kep1", Kep1TextBox.Text ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@kep2", Kep2TextBox.Text ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@kep3", Kep3TextBox.Text ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@raktaraz", RaktarComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@ar", string.IsNullOrEmpty(ArTextBox.Text) ? (object)DBNull.Value : ArTextBox.Text);
                    command.Parameters.AddWithValue("@cikszam", CikkszamTextBox.Text ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@markaaz", MarkaComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@nemaz", NemComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@meghajtasaz", MeghajtasComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@vizallosagaz", VizallosagComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@jotallasaz", JotallasComboBox.SelectedValue ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@meretmillimeterben", string.IsNullOrEmpty(MeretMillimeterbenTextBox.Text) ? (object)DBNull.Value : MeretMillimeterbenTextBox.Text);
                    command.Parameters.AddWithValue("@sulygrammbanaz", SulyGrammbanComboBox.SelectedValue ?? (object)DBNull.Value);
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
                    command.Parameters.AddWithValue("@db", string.IsNullOrEmpty(DbTextBox.Text) ? (object)DBNull.Value : int.Parse(DbTextBox.Text));

                    command.ExecuteNonQuery();
                }

                MessageBox.Show("Az óra sikeresen hozzáadásra került!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);

                
                OnOraAdded?.Invoke();

                Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a mentés során: {ex.Message}\n{ex.StackTrace}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("A művelet megszakítva.", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
            this.Close();
        }

        private void NumberOnly_PreviewTextInput(object sender, System.Windows.Input.TextCompositionEventArgs e)
        {
            e.Handled = !int.TryParse(e.Text, out _); 
        }
    }
}
