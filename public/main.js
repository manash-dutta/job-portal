async function deleteJob(id) {
  const confirmDeletion = confirm("Are you sure you want to delete this Job?");
  if (confirmDeletion) {
    try {
      const response = await fetch(`/delete-job/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        window.location.href = "/jobs";
      } else {
        console.error("Failed to delete the job");
      }
    } catch (error) {
      console.error("Error occured while deleting the Job:", error);
    }
  }
}
