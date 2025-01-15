# Setup instructions:

- npm install
- npm run dev

# Vercel Deployment URL:

<a href="https://note-manager-zeta.vercel.app/" target="_blank">https://note-manager-zeta.vercel.app/</a>

# Assumptions Made:

No assumptions made

# Technical decisions explained:

- used recursions with DFS to build helper functions for TreeNode interface such as findNodeById, getPathToNode (to be displayed in the BreadCrumb).
- used MUI for styling to ensure re-usability, readability, and making use of MUI base theme.
- preferred to split a component into two parts, one for styling and one for handling logic, for readable and easy to maintain code.
- separate folder for models or types to represent different types in the App in one place.
- styles folder for common styles across the App besides the specific component styles.
- global utils folder for common utils across the App.

# Questions asked during implementation and their answers:

1.

- Question : Asked about the node type in the tree what would it look like
- Answer : a tree node could be a folder or a note and folders could contain notes.

2.

- Question :Asked if the responsive is required in this part or no
- Answer : responsive is not required in this part.

# Known Limitations:

- When the tree size grows up the left panel should be resized or be x-scrollable
- Design is not that much pretty
- the explorer header could be sticky so that when depth of the tree increase it still be shown

# Done Parts:

- User can add a note or a folder at any level of the tree, Except when adding a note under a note, It could only be possible if adding notes under folders.
- User can edit name in place for easy naming and better user experience,
  when user clicks on add folder or note, the title of both could be edited in place by just typing the new name and press enter.
- User can delete notes or folders, In case of deleting folders which contains sub folders or notes, the user should confirm the deletion.
- User can view the note and change it by clicking on it, it appears in the EditorView and can view and edit both title and content
- Alerts are shown whenever user makes an interaction, i.e. adding folder, or note, deleting any of them, updating any of them.
- Made simple validations for editing that title of any of the two types shouldn't be null, it also shows an alert of a proper message
- All items are stored in database and handled reloads gracefully to maintain the last opened note and the collapsed items as it.
- Added Skeletons for for left panel and loading indicator for the right panel, as for now, we aren't getting data from a server so I've simulated a data fetching loading for better user experience (time 500ms).
- added left panel header which contains actions for adding folder to the root, adding note to the root and collapse/expand all nodes in the tree.
- handled palceholders for empty states, for example empty tree or empty editor view.
- creating an item inside a collapsed item makes it expands and the focus is on the new created item to edit the title and save, which is a good UX and quick to use.
- clicking items from BreadCrumb refers to this item in the left panel for easy browsing.

# Future Improvements:

- Adjust design.
- Adjust responsiveness.
- Write more tests.
- Preview tree in multiple representations.
- Add more attributes to notes for example: marked as read.
- Filtering and searching in the tree.
- Move a node (folder or Note) to another node.
- Duplicates a note or a folder.
- Handle the overflow in the x-axis for the left panel.
