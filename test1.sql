
-- final
SELECT 
    tree_table.id as id,
    tree_table.friendly_name,
    tree_table.scientific_name,
    user_table.name as owner_name,
    COALESCE(like_count, 0) AS likes
FROM tree_table 
JOIN user_table 
ON tree_table.owner_id = user_table.id AND user_table.email = 'adam@versett.com'
LEFT JOIN (
	SELECT tree_id, COUNT(*) AS like_count
	FROM likes_table
	GROUP BY tree_id
) like_counts ON like_counts.tree_id = tree_table.id
