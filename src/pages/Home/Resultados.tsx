import { useProducts } from '../../hooks/useProducts'
import { DataTable, Panel } from '@nichagiro/ui-primitives'
import type { Column } from '@nichagiro/ui-primitives'
import type { Product } from '../../types/product'

const columns: Column<Product>[] = [
  { header: 'ID', key: 'id', sortable: true },
  { header: 'Nombre', key: 'title', sortable: true },
  {
    header: 'Precio',
    key: 'price',
    sortable: true,
    render: (row) => `$${row.price.toLocaleString()}`,
  },
  {
    header: 'Categoría',
    key: 'category',
    render: (row) => row.category.name,
  },
]

export function Resultados() {
  const { products, isLoading } = useProducts()

  return (
    <Panel title="Resultados" colorScheme="primary">
      <DataTable
        columns={columns}
        data={products}
        keyExtractor={(row) => row.id}
        searchable
        striped
        loading={isLoading}
      />
    </Panel>
  )
}
