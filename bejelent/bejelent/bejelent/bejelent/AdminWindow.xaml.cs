using System;
using System.Data;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using MySql.Data.MySqlClient;

namespace BejelentkezesApp
{
    public partial class Admin : Window
    {
        private readonly string connectionString = "server=localhost;user=root;password=root;database=ora;";
        private string selectedTable;
        private readonly string userRole;
        private bool isLoggingOut = false;


        private readonly Dictionary<string, string> tableNameMapping = new Dictionary<string, string>
        {
            { "felhasznalok", "Felhasználók" },
            { "atok", "Tok" },
            { "vasarlo", "Vásárlók" },
            { "szallitassz", "Szállítási adatok" },
            { "fizetesmod", "Fizetésmód" },
            { "szallitas", "Szállítás" },
            { "vizallosag", "Vízállóság" },
            { "tipus", "Típus" },
            { "szijszine", "Szíj színe" },
            { "szij", "Szíj fajtája" },
            { "sulygrammban", "Súly grammban" },
            { "nem", "Nem" },
            { "maxcsuklomili", "Maximális csuklóméret milliméterben" },
            { "raktar", "Raktár" },
            { "oraforma", "Óraforma" },
            { "meghajtas", "Maghajtás" },
            { "marka", "Márka" },
            { "kristalyuveg", "Üveg fajta" },
            { "jotallas", "Jótállás" },
            { "extrafunkcio", "Extrafunkció" },
            { "datumkijelzes", "Dátumkijelzés" },
            { "atokszine", "A tok színe" },
            { "szamlapszine", "Számlap színe" },
            { "megrendeles", "Megrendelés" },
            { "aszamlapszine", "A számlap színe" },
            { "szamlaptipus", "A számlap típusa" },
            { "szamla", "Számla" },

        };

        private readonly Dictionary<string, string> columnHeaderMapping = new Dictionary<string, string>
            {

                { "aszamlapszineaz", "Számlap színe azonosító/  " },
                { "aszamlapszine", "Számlap színe/  " },
                { "datumkijelzesaz", "Dátumkijelzés azonosító/  " },
                { "datumkijelzes", "Dátumkijelzés/  " },
                { "atokaz", "Tok azonosító/  " },
                { "atok", "Tok/  " },
                { "extrafunkcioaz", "Extrefunkció azonosító/  " },
                { "extrafunkcio", "Extrafunkció/  " },
                { "id", "Felhasználó azonosító/  " },
                { "nev", "Név/  " },
                { "felhasznalonev", "Felhasználónév/  " },
                { "jelszo", "Jelszó/  " },
                { "jogosultsag", "Jogosultság/  " },
                { "fizetesmodaz", "Fizetésmód azonosító/  " },
                { "fizetesmod", "Fizetésmód/  " },
                { "jotallasaz", "Jótállás azonosító/  " },
                { "jotallas", "Jótállás/  " },
                { "kristalyuvegaz", "Üveg fajtája azonosító/  " },
                { "kristalyuveg", "Üveg fajtája/  " },
                { "markaaz", "Márka azonosító/  " },
                { "marka", "Márka/  " },
                { "maxcsuklomiliaz", "Max csukló milliméter azonosító/  " },
                { "maxcsuklomili", "Max csukló milliméter/  " },
                { "meghajtasaz", "Meghajtás azonosító/  " },
                { "meghajtas", "Meghajtás/  " },
                { "nemaz", "Nem azonosító/  " },
                { "nem", "Nem/  " },
                { "oraformaaz", "Óraforma azonosító/  " },
                { "oraforma", "Óraforma/  " },
                { "raktaraz", "Raktár azonosító/  " },
                { "raktar", "Raktár/  " },
                { "sulygrammbanaz", "Súly grammban azonosító/  " },
                { "sulygrammban", "Súly grammban/  " },
                { "szamlaptipusaz", "Számlap típus azonosító/  " },
                { "szamlaptipus", "Számlap típus/  " },
                { "szijaz", "Szíj azonosító/  " },
                { "szij", "Szíj/  " },
                { "szijszineaz", "Szíj színe azonosító/  " },
                { "szijszine", "Szíj színe/  " },
                { "tipusaz", "Típus azonosító/  " },
                { "tipus", "Típus/  " },
                { "vizallosagaz", "Vízállóság azonosító/  " },
                { "vizallosag", "Vízállóság/  " },
                { "atokszineaz", "A tok színe azonosító/  " },
                { "atokszine", "A tok színe/  " },
                { "szallitasaz", "Szállítás azonisító/  " },
                { "iranyszam", "Irányítószám/  " },
                { "varos", "Város/  " },
                { "vasarloaz", "Vásárló azonosító/  " },
                { "tel", "Telefonszám/  " },
                { "email", "Email/  " },
                { "oraaz", "Óra azonosító/  " },
                { "megnevezes", "Megnevezés/  " },
                { "kep1", "Kép1/  " },
                { "kep2", "Kép2/  " },
                { "kep3", "Kép3/  " },
                { "ar", "Ár/  " },
                { "cikkszam", "Cikkszám/  " },
                { "meretmillimeterben", "Méret milliméterben/  " },
                { "db", "Db  " },
                { "szamlaaz", "Számla azonosító/  " },
                { "cim", "Cím/  " },
                { "vnev", "Vásárló Neve/  " },
                { "oranev", "Óra neve/  " },
                { "sznev", "Szállítási Név/  " },
                { "datum", "Dátum/  " },
                { "adoszam", "Adószám/  " },

            };


        public Admin(string jogosultsag)
        {
            InitializeComponent();
            userRole = jogosultsag;
            LoadTables();
        }

        private void LoadTables()
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    DataTable tables = connection.GetSchema("Tables");

                    
                    var tableNames = tables.AsEnumerable()
                        .Select(row => row["TABLE_NAME"].ToString())
                        .Where(table => table != "ora" && table != "szamla" && table != "megrendeles")
                        .ToList();

                    
                    if (userRole != "admin")
                    {
                        tableNames.Remove("felhasznalok");
                    }

                    
                    var displayNames = tableNames
                        .Select(table => tableNameMapping.ContainsKey(table) ? tableNameMapping[table] : table)
                        .ToList();

                    
                    TableComboBox.ItemsSource = displayNames;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba az oralekerdezes nézet betöltésekor:\n{ex.Message}\n{ex.StackTrace}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }

        }





        private void ListDataButton_Click(object sender, RoutedEventArgs e)
        {
            if (TableComboBox.SelectedItem == null)
            {
                MessageBox.Show("Válassz ki egy táblát!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            
            string selectedDisplayName = TableComboBox.SelectedItem.ToString();
            selectedTable = tableNameMapping.FirstOrDefault(x => x.Value == selectedDisplayName).Key ?? selectedDisplayName;

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = $"SELECT * FROM `{selectedTable}`";
                    MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);
                    DataGrid.ItemsSource = dataTable.DefaultView;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba az adatok betöltésekor:\n{ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }


        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            DataTable dt = (DataGrid.ItemsSource as DataView)?.Table;
            if (dt != null)
            {
                dt.Rows.Add(dt.NewRow());
            }
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            SaveTableData("Adminisztráció");
        }

        private void UpdateButton_Click(object sender, RoutedEventArgs e)
        {
            if (DataGrid.SelectedItem is not DataRowView selectedRow)
            {
                MessageBox.Show("Válassz ki egy sort a módosításhoz!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            EditDataWindow editWindow = new EditDataWindow(selectedRow);
            if (editWindow.ShowDialog() == true && editWindow.UpdatedData != null)
            {
                try
                {
                    using MySqlConnection connection = new MySqlConnection(connectionString);
                    connection.Open();

                   
                    string queryPk = $@"
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
                WHERE TABLE_NAME = '{selectedTable}' 
                AND TABLE_SCHEMA = DATABASE() 
                AND CONSTRAINT_NAME = 'PRIMARY';";
                    string primaryKeyColumn = new MySqlCommand(queryPk, connection).ExecuteScalar()?.ToString();

                    if (string.IsNullOrEmpty(primaryKeyColumn))
                    {
                        MessageBox.Show("Nem található elsődleges kulcs!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                        return;
                    }

                    string updateQuery = $"UPDATE `{selectedTable}` SET ";
                    foreach (var kvp in editWindow.UpdatedData)
                    {
                        updateQuery += $"`{kvp.Key}` = @{kvp.Key}, ";
                    }
                    updateQuery = updateQuery.TrimEnd(',', ' ');
                    updateQuery += $" WHERE `{primaryKeyColumn}` = @key";

                    MySqlCommand cmd = new MySqlCommand(updateQuery, connection);
                    foreach (var kvp in editWindow.UpdatedData)
                    {
                        cmd.Parameters.AddWithValue($"@{kvp.Key}", kvp.Value ?? DBNull.Value);
                    }
                    cmd.Parameters.AddWithValue("@key", selectedRow.Row[primaryKeyColumn]);
                    cmd.ExecuteNonQuery();

                    MessageBox.Show("A módosítás sikeres volt!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                    ListDataButton_Click(null, null);
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba a módosítás során:\n{ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }


        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            DeleteTableData("Adminisztráció");
        }
        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            CancelTableData("Adminisztráció");
        }


        private void LoadOraTable_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    
                    connection.Open();

                    string query = "SELECT * FROM oralekerdezes ORDER BY oraaz ASC"; 
                    MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);

                    OraDataGrid.ItemsSource = dataTable.DefaultView; 
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba az oralekerdezes nézet betöltésekor:\n{ex.Message}\n{ex.StackTrace}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }

        }


        private void SaveOraButton_Click(object sender, RoutedEventArgs e)
        {
            SaveTableData("Óra Tábla");
        }

        private void UpdateOraButton_Click(object sender, RoutedEventArgs e)
        {
            UpdateTableData("Óra Tábla");
        }

        

        private void CancelOraButton_Click(object sender, RoutedEventArgs e)
        {
            CancelTableData("Óra Tábla");
        }


        private void SaveTableData(string tableType)
        {
            try
            {
                DataGrid grid = tableType == "Adminisztráció" ? DataGrid : OraDataGrid;
                DataTable dt = (grid.ItemsSource as DataView)?.Table;
                DataRow newRow = dt?.Rows.Cast<DataRow>().LastOrDefault(row => row.RowState == DataRowState.Added);

                if (newRow == null)
                {
                    MessageBox.Show($"Nincs új sor a mentéshez a(z) {tableType}-ban!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }

                string tableName = tableType == "Adminisztráció" ? selectedTable : "ora";

                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string insertQuery = $"INSERT INTO `{tableName}` (";
                    string valuesQuery = "VALUES (";

                    foreach (DataColumn column in dt.Columns)
                    {
                        insertQuery += $"{column.ColumnName}, ";
                        valuesQuery += $"@{column.ColumnName}, ";
                    }

                    insertQuery = insertQuery.TrimEnd(',', ' ') + ")";
                    valuesQuery = valuesQuery.TrimEnd(',', ' ') + ")";

                    MySqlCommand command = new MySqlCommand(insertQuery + " " + valuesQuery, connection);

                    foreach (DataColumn column in dt.Columns)
                    {
                        command.Parameters.AddWithValue($"@{column.ColumnName}", newRow[column]);
                    }

                    command.ExecuteNonQuery();
                }

                MessageBox.Show($"Új sor sikeresen mentve a(z) {tableType}-ban!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                if (tableType == "Adminisztráció")
                    ListDataButton_Click(null, null);
                else
                    LoadOraTable_Click(null, null);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt a mentés során:\n{ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }


        private void UpdateTableData(string tableType)
        {
            try
            {
                DataGrid grid = tableType == "Adminisztráció" ? DataGrid : OraDataGrid;
                DataRowView rowView = grid.SelectedItem as DataRowView;

                if (rowView == null)
                {
                    MessageBox.Show($"Válassz egy sort a módosításhoz a(z) {tableType}-ban!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                string tableName = tableType == "Adminisztráció" ? selectedTable : "ora";
                string primaryKeyColumn;

                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    string primaryKeyQuery = $@"
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
                WHERE TABLE_NAME = '{tableName}' 
                AND TABLE_SCHEMA = DATABASE() 
                AND CONSTRAINT_NAME = 'PRIMARY';";

                    MySqlCommand command = new MySqlCommand(primaryKeyQuery, connection);
                    primaryKeyColumn = command.ExecuteScalar()?.ToString();

                    if (string.IsNullOrEmpty(primaryKeyColumn))
                    {
                        MessageBox.Show($"Az elsődleges kulcs oszlop nem található a(z) {tableName} táblában!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                        return;
                    }
                }

                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string updateQuery = $"UPDATE `{tableName}` SET ";

                    foreach (DataColumn column in rowView.Row.Table.Columns)
                    {
                        if (column.ColumnName != primaryKeyColumn)
                        {
                            updateQuery += $"`{column.ColumnName}` = @{column.ColumnName}, ";
                        }
                    }

                    updateQuery = updateQuery.TrimEnd(',', ' ') + $" WHERE `{primaryKeyColumn}` = @{primaryKeyColumn}";

                    MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection);

                   
                    HashSet<string> addedParameters = new HashSet<string>();

                    foreach (DataColumn column in rowView.Row.Table.Columns)
                    {
                        string parameterName = $"@{column.ColumnName}";

                        if (!addedParameters.Contains(parameterName))
                        {
                            object value = rowView.Row[column];
                            updateCommand.Parameters.AddWithValue(parameterName, value ?? DBNull.Value);
                            addedParameters.Add(parameterName);
                        }
                    }

                    
                    string primaryKeyParameter = $"@{primaryKeyColumn}";
                    if (!addedParameters.Contains(primaryKeyParameter))
                    {
                        updateCommand.Parameters.AddWithValue(primaryKeyParameter, rowView.Row[primaryKeyColumn]);
                    }

                    int rowsAffected = updateCommand.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        MessageBox.Show($"Sor módosítva a(z) {tableType}-ban!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                    }
                    else
                    {
                        MessageBox.Show($"Nem történt módosítás a(z) {tableType}-ban. Ellenőrizd az adatokat!", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
                    }
                }

                if (tableType == "Adminisztráció")
                    ListDataButton_Click(null, null);
                else
                    LoadOraTable_Click(null, null);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt a módosítás során:\n{ex.Message}\n{ex.StackTrace}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }



        private void DeleteTableData(string tableType)
        {
            try
            {
                DataGrid grid = tableType == "Adminisztráció" ? DataGrid : OraDataGrid;
                DataRowView rowView = grid.SelectedItem as DataRowView;

                if (rowView == null)
                {
                    MessageBox.Show($"Válassz egy sort a törléshez a(z) {tableType}-ban!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                string tableName = tableType == "Adminisztráció" ? selectedTable : "ora";
                string primaryKeyColumn;

                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    
                    string primaryKeyQuery = $@"
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
                WHERE TABLE_NAME = '{tableName}' 
                AND TABLE_SCHEMA = DATABASE() 
                AND CONSTRAINT_NAME = 'PRIMARY';";

                    MySqlCommand command = new MySqlCommand(primaryKeyQuery, connection);
                    primaryKeyColumn = command.ExecuteScalar()?.ToString();

                    if (string.IsNullOrEmpty(primaryKeyColumn))
                    {
                        MessageBox.Show($"Az elsődleges kulcs oszlop nem található a(z) {tableName} táblában!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                        return;
                    }
                }

                
                MessageBoxResult result = MessageBox.Show(
                    $"Biztosan törölni szeretnéd ezt a sort a(z) {tableType}-ból?",
                    "Megerősítés",
                    MessageBoxButton.YesNo,
                    MessageBoxImage.Warning);

                if (result == MessageBoxResult.Yes)
                {
                    using (MySqlConnection connection = new MySqlConnection(connectionString))
                    {
                        connection.Open();
                        string deleteQuery = $"DELETE FROM `{tableName}` WHERE `{primaryKeyColumn}` = @key";
                        MySqlCommand deleteCommand = new MySqlCommand(deleteQuery, connection);
                        deleteCommand.Parameters.AddWithValue("@key", rowView.Row[primaryKeyColumn]);
                        deleteCommand.ExecuteNonQuery();
                    }

                    MessageBox.Show($"Sor törölve a(z) {tableType}-ból!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                    if (tableType == "Adminisztráció")
                        ListDataButton_Click(null, null);
                    else
                        LoadOraTable_Click(null, null);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt a törlés során:\n{ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void CancelTableData(string tableType)
        {
            DataTable dt;

            
            if (tableType == "Óra Tábla")
            {
                dt = (OraDataGrid.ItemsSource as DataView)?.Table;
            }
            else if (tableType == "Adminisztráció")
            {
                dt = (DataGrid.ItemsSource as DataView)?.Table;
            }
            else
            {
                MessageBox.Show("Ismeretlen tábla típus.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (dt == null)
            {
                MessageBox.Show("Nincs aktív művelet a megszakításhoz.", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
                return;
            }

            
            var newRows = dt.AsEnumerable().Where(row => row.RowState == DataRowState.Added).ToList();
            foreach (var newRow in newRows)
            {
                newRow.Delete();
            }

            dt.RejectChanges();
            MessageBox.Show("A művelet megszakítva.", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
            if (tableType == "Óra Tábla")
            {
                OraDataGrid.ItemsSource = dt.DefaultView;
            }
            else if (tableType == "Adminisztráció")
            {
                DataGrid.ItemsSource = dt.DefaultView;
            }
        }

        private void DeleteOraEntry_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                DataRowView rowView = OraDataGrid.SelectedItem as DataRowView;

                if (rowView == null)
                {
                    MessageBox.Show("Válassz ki egy sort a törléshez!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                string primaryKeyColumn = "oraaz"; 
                object primaryKeyValue = rowView.Row[primaryKeyColumn];

                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string deleteQuery = $"DELETE FROM ora WHERE `{primaryKeyColumn}` = @key";
                    MySqlCommand deleteCommand = new MySqlCommand(deleteQuery, connection);
                    deleteCommand.Parameters.AddWithValue("@key", primaryKeyValue);
                    deleteCommand.ExecuteNonQuery();
                }

                MessageBox.Show("A kiválasztott sor törölve lett!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                LoadOraTable_Click(null, null); 
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a törlés során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void ModifyOraEntry_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                DataRowView rowView = OraDataGrid.SelectedItem as DataRowView;

                if (rowView == null)
                {
                    MessageBox.Show("Válassz ki egy sort a módosításhoz!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                string primaryKeyColumn = "oraaz"; 
                object primaryKeyValue = rowView.Row[primaryKeyColumn];

                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string updateQuery = "UPDATE ora SET ";

                    foreach (DataColumn column in rowView.Row.Table.Columns)
                    {
                        if (column.ColumnName != primaryKeyColumn)
                        {
                            updateQuery += $"{column.ColumnName} = @{column.ColumnName}, ";
                        }
                    }

                    updateQuery = updateQuery.TrimEnd(',', ' ') + $" WHERE `{primaryKeyColumn}` = @{primaryKeyColumn}";

                    MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection);

                    foreach (DataColumn column in rowView.Row.Table.Columns)
                    {
                        updateCommand.Parameters.AddWithValue($"@{column.ColumnName}", rowView.Row[column]);
                    }

                    updateCommand.Parameters.AddWithValue($"@{primaryKeyColumn}", primaryKeyValue);
                    updateCommand.ExecuteNonQuery();
                }

                MessageBox.Show("A módosítás sikeres volt!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                LoadOraTable_Click(null, null); 
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a módosítás során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void DeleteOraRowButton_Click(object sender, RoutedEventArgs e)
        {
            if (OraDataGrid.SelectedItem == null)
            {
                MessageBox.Show("Kérlek, válassz ki egy sort a törléshez!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            
            MessageBoxResult result = MessageBox.Show("Biztosan törölni szeretnéd ezt az órát?", "Megerősítés", MessageBoxButton.YesNo, MessageBoxImage.Question);

            if (result == MessageBoxResult.Yes)
            {
                try
                {
                    DataRowView selectedRow = OraDataGrid.SelectedItem as DataRowView;
                    int oraAz = Convert.ToInt32(selectedRow["oraaz"]);

                    using (MySqlConnection connection = new MySqlConnection(connectionString))
                    {
                        connection.Open();
                        string deleteQuery = "DELETE FROM ora WHERE oraaz = @oraaz";
                        MySqlCommand command = new MySqlCommand(deleteQuery, connection);
                        command.Parameters.AddWithValue("@oraaz", oraAz);
                        command.ExecuteNonQuery();
                    }

                    MessageBox.Show("A kiválasztott sor törölve lett!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                    LoadOraTable_Click(null, null);
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba történt a törlés során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }






        private void SaveChangesOraButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                
                DataRowView selectedRow = OraDataGrid.SelectedItem as DataRowView;

                if (selectedRow == null)
                {
                    MessageBox.Show("Kérlek, válassz ki egy sort a módosításhoz!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }

                
                int oraId = Convert.ToInt32(selectedRow["oraaz"]);

                
                EditOraWindow editWindow = new EditOraWindow(oraId);
                editWindow.ShowDialog();

                
                LoadOraTable_Click(null, null);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt a módosítás során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void LoadInvoicesButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    
                    string query = "SELECT * FROM szamlazas";
                    MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);

                    InvoiceDataGrid.ItemsSource = dataTable.DefaultView;

                    InvoiceDataGrid.IsReadOnly = false;
                    InvoiceDataGrid.SelectionMode = DataGridSelectionMode.Single;
                    InvoiceDataGrid.SelectionUnit = DataGridSelectionUnit.FullRow;
                    InvoiceDataGrid.CanUserAddRows = false;
                    InvoiceDataGrid.CanUserDeleteRows = false;
                    InvoiceDataGrid.CanUserResizeRows = true;
                    InvoiceDataGrid.CanUserResizeColumns = true;

                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a számlák betöltésekor:\n{ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }


        private void CreateInvoiceButton_Click(object sender, RoutedEventArgs e)
        {
            CreateInvoiceWindow createInvoiceWindow = new CreateInvoiceWindow();
            createInvoiceWindow.ShowDialog();

            
            LoadInvoices();
        }

        private void DeleteInvoiceButton_Click(object sender, RoutedEventArgs e)
        {
            if (InvoiceDataGrid.SelectedItem == null)
            {
                MessageBox.Show("Kérlek, válassz ki egy számlát a törléshez!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            
            MessageBoxResult result = MessageBox.Show("Biztosan törölni szeretnéd ezt a számlát?", "Megerősítés", MessageBoxButton.YesNo, MessageBoxImage.Question);

            if (result == MessageBoxResult.Yes) 
            {
                try
                {
                    DataRowView selectedRow = InvoiceDataGrid.SelectedItem as DataRowView;
                    int szamlaAz = Convert.ToInt32(selectedRow["szamlaaz"]);

                    using (MySqlConnection connection = new MySqlConnection(connectionString))
                    {
                        connection.Open();
                        string deleteQuery = "DELETE FROM szamla WHERE szamlaaz = @szamlaaz";
                        MySqlCommand deleteCommand = new MySqlCommand(deleteQuery, connection);
                        deleteCommand.Parameters.AddWithValue("@szamlaaz", szamlaAz);
                        deleteCommand.ExecuteNonQuery();
                    }

                    MessageBox.Show("A számla sikeresen törölve lett!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                    LoadInvoices();
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba történt a számla törlése során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            
        }






        private void SaveInvoiceButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Számla mentése funkció még nincs implementálva.");
        }

        private void UpdateInvoiceButton_Click(object sender, RoutedEventArgs e)
        {
            if (InvoiceDataGrid.SelectedItem == null)
            {
                MessageBox.Show("Válassz ki egy számlát!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            DataRowView selectedRow = InvoiceDataGrid.SelectedItem as DataRowView;
            int szamlaAz = Convert.ToInt32(selectedRow["szamlaaz"]);

            
            EditInvoiceWindow editInvoiceWindow = new EditInvoiceWindow(szamlaAz);
            editInvoiceWindow.ShowDialog();

            LoadInvoices(); 
        }



        private void CancelInvoiceButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Művelet megszakítva.");
        }








        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBoxResult result = MessageBox.Show(
                "Biztosan be akarod zárni az admin panelt?",
                "Kilépés megerősítése",
                MessageBoxButton.YesNo,
                MessageBoxImage.Question
            );

            if (result == MessageBoxResult.Yes)
            {
                isLoggingOut = true; 
                MainWindow loginWindow = new MainWindow();
                loginWindow.Show();
                this.Close();
            }
        }



        private void DataGrid_AutoGeneratingColumn(object sender, DataGridAutoGeneratingColumnEventArgs e)
        {
            if (columnHeaderMapping.ContainsKey(e.PropertyName))
            {
                e.Column.Header = columnHeaderMapping[e.PropertyName]; 
            }
        }


        private void AddOraButton_Click(object sender, RoutedEventArgs e)
        {
            
            AddOraWindow addOraWindow = new AddOraWindow();
            addOraWindow.ShowDialog(); 
        }
        private void LoadInvoices()
        {
            try
            {
                object selectedItem = InvoiceDataGrid.SelectedItem; 

                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "SELECT * FROM szamlazas"; 
                    MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);
                    InvoiceDataGrid.ItemsSource = dataTable.DefaultView;
                }

                InvoiceDataGrid.IsReadOnly = false; 
                InvoiceDataGrid.SelectionMode = DataGridSelectionMode.Single;
                InvoiceDataGrid.SelectionUnit = DataGridSelectionUnit.FullRow;
                InvoiceDataGrid.CanUserAddRows = false;
                InvoiceDataGrid.CanUserDeleteRows = false;
                InvoiceDataGrid.CanUserResizeRows = true;
                InvoiceDataGrid.CanUserResizeColumns = true;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt a számlák betöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }



        private void OraDataGrid_AutoGeneratingColumn(object sender, DataGridAutoGeneratingColumnEventArgs e)
        {
            if (columnHeaderMapping.ContainsKey(e.PropertyName))
            {
                e.Column.Header = columnHeaderMapping[e.PropertyName];
            }
        }

        private void InvoiceDataGrid_AutoGeneratingColumn(object sender, DataGridAutoGeneratingColumnEventArgs e)
        {
            if (columnHeaderMapping.ContainsKey(e.PropertyName))
            {
                e.Column.Header = columnHeaderMapping[e.PropertyName];
            }

            DataGridTextColumn column = e.Column as DataGridTextColumn;
            if (column != null)
            {
                column.IsReadOnly = false; 
                column.CanUserSort = true;
            }
        }


        private void InvoiceDataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            
        }

     


        private void InvoiceDataGrid_MouseDown(object sender, System.Windows.Input.MouseButtonEventArgs e)
        {
            if (InvoiceDataGrid.SelectedItem == null)
            {
                MessageBox.Show("A sor nem választható ki! Valami blokkolja a kijelölést.", "Figyelmeztetés", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }

        private void TabControl_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (InvoiceTab.IsSelected) 
            {
                
                InvoiceDataGrid.Focus(); 
            }
        }


        private void SearchButton_Click(object sender, RoutedEventArgs e)
        {
            string keresettSzoveg = SearchTextBox.Text.Trim();

            if (string.IsNullOrWhiteSpace(keresettSzoveg) || keresettSzoveg == "Keresés...")
            {
                MessageBox.Show("Kérlek, írj be keresési kifejezést!", "Hiányzó adat", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }


            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    string query = "SELECT * FROM oralekerdezes WHERE megnevezes LIKE @kereses ORDER BY oraaz ASC";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@kereses", $"%{keresettSzoveg}%");

                    MySqlDataAdapter adapter = new MySqlDataAdapter(command);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);

                    SearchTextBox.Text = "";
                    SearchTextBox.Foreground = Brushes.Gray;

                    if (dataTable.Rows.Count == 0)
                    {
                        MessageBox.Show("A keresés nem hozott eredményt!", "Nincs találat", MessageBoxButton.OK, MessageBoxImage.Information);
                        return; 
                    }

                    OraDataGrid.ItemsSource = dataTable.DefaultView;

                    
                    SearchTextBox.Text = "Keresés...";
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a keresés során:\n{ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void SearchTextBox_GotFocus(object sender, RoutedEventArgs e)
        {
            if (SearchTextBox.Text == "Keresés...")
            {
                SearchTextBox.Text = "";
                SearchTextBox.Foreground = Brushes.Black;
            }
        }

        private void SearchTextBox_LostFocus(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(SearchTextBox.Text))
            {
                SearchTextBox.Text = "Keresés...";
                SearchTextBox.Foreground = Brushes.Gray;
            }
        }

        private void InvoiceSearchTextBox_GotFocus(object sender, RoutedEventArgs e)
        {
            if (InvoiceSearchTextBox.Text == "Keresés...")
            {
                InvoiceSearchTextBox.Text = "";
                InvoiceSearchTextBox.Foreground = Brushes.Black;
            }
        }

        private void InvoiceSearchTextBox_LostFocus(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(InvoiceSearchTextBox.Text))
            {
                InvoiceSearchTextBox.Text = "Keresés...";
                InvoiceSearchTextBox.Foreground = Brushes.Gray;
            }
        }


        private void InvoiceSearchButton_Click(object sender, RoutedEventArgs e)
        {
            string keresettSzoveg = InvoiceSearchTextBox.Text.Trim();

            if (string.IsNullOrWhiteSpace(keresettSzoveg) || keresettSzoveg == "Keresés...")
            {
                MessageBox.Show("Kérlek, írj be valamit a keresőmezőbe!", "Hiányzó adat", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    string query = @"SELECT * FROM szamlazas 
                             WHERE sznev LIKE @keres 
                                OR email LIKE @keres 
                                OR tel LIKE @keres
                                OR cim LIKE @keres
                                OR DATE_FORMAT(datum, '%Y.%m.%d') LIKE @keres";

                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@keres", $"%{keresettSzoveg}%");

                    MySqlDataAdapter adapter = new MySqlDataAdapter(command);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);

                    if (dataTable.Rows.Count == 0)
                    {
                        MessageBox.Show("Nincs találat a keresésre!", "Nincs találat", MessageBoxButton.OK, MessageBoxImage.Information);
                    }

                    InvoiceDataGrid.ItemsSource = dataTable.DefaultView;

                    
                    InvoiceSearchTextBox.Text = "";
                    InvoiceSearchTextBox.Foreground = Brushes.Gray;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a keresés során:\n{ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }


        private void Admin_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if (!isLoggingOut) 
            {
                MessageBoxResult result = MessageBox.Show(
                    "Biztosan be akarod zárni az admin panelt?",
                    "Kilépés megerősítése",
                    MessageBoxButton.YesNo,
                    MessageBoxImage.Question
                );

                if (result != MessageBoxResult.Yes)
                {
                    e.Cancel = true;
                }
            }
        }


        private void AddNewRow_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrEmpty(selectedTable))
            {
                MessageBox.Show("Előbb válassz egy táblát a listából!", "Figyelmeztetés", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            DataTable dt = (DataGrid.ItemsSource as DataView)?.Table;
            if (dt == null)
            {
                MessageBox.Show("Nincs adat betöltve!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            AddDataWindow addWindow = new AddDataWindow(dt.Columns);
            bool? result = addWindow.ShowDialog();

            if (result == true && addWindow.NewData != null)
            {
                try
                {
                    using (MySqlConnection connection = new MySqlConnection(connectionString))
                    {
                        connection.Open();

                        string insertQuery = $"INSERT INTO `{selectedTable}` (";
                        string valuesQuery = "VALUES (";

                        foreach (var kvp in addWindow.NewData)
                        {
                            insertQuery += $"`{kvp.Key}`, ";
                            valuesQuery += $"@{kvp.Key}, ";
                        }

                        insertQuery = insertQuery.TrimEnd(',', ' ') + ")";
                        valuesQuery = valuesQuery.TrimEnd(',', ' ') + ")";

                        MySqlCommand command = new MySqlCommand($"{insertQuery} {valuesQuery}", connection);

                        foreach (var kvp in addWindow.NewData)
                        {
                            command.Parameters.AddWithValue($"@{kvp.Key}", kvp.Value ?? DBNull.Value);
                        }

                        command.ExecuteNonQuery();
                    }

                    MessageBox.Show("Sikeres hozzáadás!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                    ListDataButton_Click(null, null); // Frissítés
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba a mentés során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }


    }



}
