using System;
using System.Data;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using MySql.Data.MySqlClient;

namespace BejelentkezesApp
{
    public partial class Admin : Window
    {
        private readonly string connectionString = "server=localhost;user=root;password=root;database=ora;";
        private string selectedTable;
        private readonly string userRole;


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
                { "aszamlapszine", "Számlap színe" },
                { "datumkijelzesaz", "Dátumkijelzés azonosító/  " },
                { "datumkijelzes", "Dátumkijelzés" },
                { "atokaz", "Tok azonosító/  " },
                { "atok", "Tok" },
                { "extrafunkcioaz", "Extrefunkció azonosító/  " },
                { "extrafunkcio", "Extrafunkció" },
                { "id", "Felhasználó azonosító/  " },
                { "nev", "Név/  " },
                { "felhasznalonev", "Felhasználónév/  " },
                { "jelszo", "Jelszó/  " },
                { "jogosultsag", "Jogosultság" },
                { "fizetesmoddaz", "Fizetésmód azonosító/  " },
                { "fizetesmod", "Fizetésmód" },
                { "jotallasaz", "Jótállás azonosító/  " },
                { "jotallas", "Jótállás" },
                { "kristalyuvegaz", "Üveg fajtája azonosító/  " },
                { "kristalyuveg", "Üveg fajtája" },
                { "markaaz", "Márka azonosító/  " },
                { "marka", "Márka" },
                { "maxcsuklomiliaz", "Max csukló milliméter azonosító/  " },
                { "maxcsuklomili", "Max csukló milliméter" },
                { "maghajtasaz", "Meghajtás azonosító/  " },
                { "meghajtas", "Meghajtás" },
                { "nemaz", "Nem azonosító/  " },
                { "nem", "Nem" },
                { "oraformaaz", "Óraforma azonosító/  " },
                { "oraforma", "Óraforma" },
                { "raktaraz", "Raktár azonosító/  " },
                { "raktar", "Raktár" },
                { "sulygrammbanaz", "Súly grammban azonosító/  " },
                { "sulygrammban", "Súly grammban" },
                { "szamlaptipusaz", "Számlap típus azonosító/  " },
                { "szamlaptipus", "Számlap típus" },
                { "szijaz", "Szíj azonosító/  " },
                { "szij", "Szíj" },
                { "szijszineaz", "Szíj színe azonosító/  " },
                { "szijszine", "Szíj színe" },
                { "tipusaz", "Típus azonosító/  " },
                { "tipus", "Típus" },
                { "vizallosagaz", "Vízállóság azonosító/  " },
                { "vizallosag", "Vízállóság" },
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
                        .Where(table => table != "ora") 
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
            UpdateTableData("Adminisztráció");
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
            try
            {
                
                DataRowView selectedRow = OraDataGrid.SelectedItem as DataRowView;

                if (selectedRow == null)
                {
                    MessageBox.Show("Kérlek, válassz ki egy sort a törléshez!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }

                
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

                    // A szamlazas nevű view-ból tölti be az adatokat
                    string query = "SELECT * FROM szamlazas";
                    MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);

                    InvoiceDataGrid.ItemsSource = dataTable.DefaultView;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a számlák betöltésekor:\n{ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }


        private void CreateInvoiceButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Számla létrehozása funkció még nincs implementálva.");
        }

        private void DeleteInvoiceButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Számla törlése funkció még nincs implementálva.");
        }

        private void SaveInvoiceButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Számla mentése funkció még nincs implementálva.");
        }

        private void UpdateInvoiceButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Számla módosítása funkció még nincs implementálva.");
        }

        private void CancelInvoiceButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Művelet megszakítva.");
        }








        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            MainWindow loginWindow = new MainWindow();
            loginWindow.Show();
            this.Close();
        }

        private void DataGrid_AutoGeneratingColumn(object sender, DataGridAutoGeneratingColumnEventArgs e)
        {
            if (columnHeaderMapping.ContainsKey(e.PropertyName))
            {
                e.Column.Header = columnHeaderMapping[e.PropertyName]; // Csak a felületen módosítja az oszlop nevét
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
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "SELECT * FROM szamlazas"; // Az adatokat a "szamlazas" nézetből/táblából tölti be
                    MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);
                    InvoiceDataGrid.ItemsSource = dataTable.DefaultView;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt a számlák betöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void TabControl_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (InvoiceTab.IsSelected) // Ha a Számlázás fül aktív
            {
                LoadInvoices(); // Automatikus betöltés
            }
        }


    }
}
