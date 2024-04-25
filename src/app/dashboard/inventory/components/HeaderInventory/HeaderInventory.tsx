"use client"

import { ComboBox } from '@/app/dashboard/components/ComboBox/ComboBox';
import { IAlertInventory } from '@/app/Types/types';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './headerinventory.module.scss';

interface Props {
    alerts: IAlertInventory[]
}

export default function HeaderInventory({ alerts }: Props) {
    const router = useRouter()
    const [stock, setStock] = useState<string>('All')

    useEffect(() => {
        if (stock === 'All') router.push('/dashboard/inventory')
        else if (stock === 'Normal') router.push('/dashboard/inventory?status=active')
        else if (stock === 'Out of Stock') router.push('/dashboard/inventory?status=outstock')
        else if (stock === 'Critical Stock') router.push('/dashboard/inventory?status=criticalstock')
        else if (stock === 'Low Stock') router.push('/dashboard/inventory?status=lowstock')
    }, [stock])

    const handleStockChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value
        setStock(value)

    }


    return (
        <div className={styles.filters}>
            <ComboBox
                name='Stock'
                options={[['All', 'All'], ['Normal', 'Normal'], ['Out of Stock', 'Out of Stock'], ['Critical Stock', 'Critical Stock'], ['Low Stock', 'Low Stock']]}
                label='Stock'
                value={stock}
                onValueChange={(e) => handleStockChange(e)}
            />
        </div>
    )
}