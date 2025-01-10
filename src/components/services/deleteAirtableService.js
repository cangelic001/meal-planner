const BEARER_TOKEN = `${import.meta.env.VITE_AIRTABLE_BEARER_TOKEN}`;
const BASE_ID = `${import.meta.env.VITE_AIRTABLE_BASE_ID}`;
const TABLE_NAME = `${import.meta.env.VITE_AIRTABLE_TABLE_NAME}`;
const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const headers = {
  Authorization: `Bearer ${BEARER_TOKEN}`,
  'Content-Type': 'application/json',
};

const deleteMealPlansByDate = async (selectedDate) => {
  console.log(`Deleting meal plans for date: "${selectedDate}"`);

  try {
    // Fetch records for the given date
    const filterFormula = `Date="${selectedDate}"`;
    const fetchResponse = await fetch(
      `${AIRTABLE_URL}?filterByFormula=${encodeURIComponent(filterFormula)}`,
      {
        method: 'GET',
        headers: headers,
      }
    );

    if (!fetchResponse.ok) {
      console.error('Fetch error status:', fetchResponse.status);
      console.error('Fetch error details:', await fetchResponse.text());
      throw new Error('Failed to fetch records for deletion');
    }

    const data = await fetchResponse.json();
    console.log('Fetched records:', data);

    const recordIds = data.records.map((record) => record.id);
    console.log('Record IDs identified for deletion:', recordIds);

    if (recordIds.length === 0) {
      console.log('No records found for the selected date');
      return;
    }

    // Batch delete request
    const deleteResponse = await fetch(`${AIRTABLE_URL}`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ records: recordIds }),
    });

    if (!deleteResponse.ok) {
      console.error('Delete error status:', deleteResponse.status);
      console.error('Delete error details:', await deleteResponse.text());
      throw new Error('Failed to delete records');
    }

    const deleteResult = await deleteResponse.json();
    console.log('Delete response:', deleteResult);
  } catch (error) {
    console.error('Error during deletion process:', error);
    alert('An error occurred while deleting the meal plans.');
  }
};

export { deleteMealPlansByDate };